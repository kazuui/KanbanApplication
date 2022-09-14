require('dotenv/config');
const db = require('../config/db.js');
const {nodemailer, transporter} = require('../config/email');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const { getOneApp } = require("./applicationController");
const { createDateTime } = require("../helpers/helpers");
const { getUserEmail } = require("./userController");


//Get amount of task in app
exports.getTaskAmount = catchAsyncErrors ( async (task_app_acronym) => {
    let sql = `SELECT * FROM kanban_web_app.task WHERE task_app_acronym = ${JSON.stringify(task_app_acronym)}`;

    const results = await db.promise().query(sql);
    return (results[0]).length
});

//Get task plan
exports.getTaskPlan = catchAsyncErrors ( async (task_name, task_app_acronym) => {
    let sql = `SELECT task_plan FROM kanban_web_app.task WHERE task_name = ${JSON.stringify(task_name)} AND task_app_acronym = ${JSON.stringify(task_app_acronym)}`;

    const results = await db.promise().query(sql);
    return ((results[0][0]).task_plan)
});

// Get task description
exports.getTaskDescription = catchAsyncErrors ( async (task_name, task_app_acronym) => {
    let sql = `SELECT task_description FROM kanban_web_app.task WHERE task_name = ${JSON.stringify(task_name)} AND task_app_acronym = ${JSON.stringify(task_app_acronym)}`;

    const results = await db.promise().query(sql);
    return ((results[0][0]).task_description)
});

//get task name
exports.getTaskName = catchAsyncErrors ( async (task_name,task_app_acronym) => {
    let sql = `SELECT * FROM kanban_web_app.task WHERE task_name = ${JSON.stringify(task_name)} AND task_app_acronym = ${JSON.stringify(task_app_acronym)}`;
    const results = await db.promise().query(sql);
    return results[0][0];
});

//Get Audit note of task
exports.getTaskAudit = catchAsyncErrors ( async (task_name,task_app_acronym) => {
    let sql = `SELECT task_notes FROM kanban_web_app.task WHERE task_name = ${JSON.stringify(task_name)} AND task_app_acronym = ${JSON.stringify(task_app_acronym)}`;

    const results = await db.promise().query(sql);
    return (JSON.stringify((results[0][0]).task_notes))
});

//Get all task
exports.getTasksOfApp = catchAsyncErrors ( async (req, res, next) => {
    const { acronym } = req.params;

    let sql = `SELECT * FROM task WHERE task_app_acronym = "${acronym}"`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
});

//Create task
exports.createTask = catchAsyncErrors ( async (req, res, next) => {
    const { 
        application,
        taskName,
        addToPlan,
        taskDescription,
        taskNote,
        username
    } = req.body;

    const existingTask = await this.getTaskName(taskName, application);

    if (!taskName.replace(/\s/g, '').length){
        res.status(200).send("no task name");
    } else if(existingTask){
        res.status(200).send("task exists");
    } else {
        const appData = await getOneApp(application);
        const taskAmount = await this.getTaskAmount(application);

        const taskID = `${appData.app_acronym}_${+appData.app_Rnumber + taskAmount}`;
        const taskState= "open";

        const createDate = new Date().toISOString().slice(0, 10);
        const date = createDateTime();

        const createTaskNote = JSON.stringify(`[${username}] created task "${taskName}" on ${date} \nTask state: ${taskState}\n${taskNote?"\nNotes:\n" + taskNote : ""}`);

        let sql = `INSERT INTO task (task_id, task_name, task_description, task_notes, task_plan, task_app_acronym, task_state, task_creator
        , task_owner, task_createDate) VALUES(${JSON.stringify(taskID)},${JSON.stringify(taskName)},${JSON.stringify(taskDescription)},${createTaskNote},${addToPlan.length? JSON.stringify(addToPlan) : null},${JSON.stringify(application)},${JSON.stringify(taskState)}
        ,${JSON.stringify(username)}, ${JSON.stringify(username)}, ${JSON.stringify(createDate)})`;
        db.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.send("Error");
            } else {
                res.send("success");
            }
        })
    }
});

//Move Task
exports.moveTask = catchAsyncErrors ( async (req, res, next) => {
    const {
        username, 
        application,
        updateType,
        currentState,
        taskID,
        taskName,
        addToPlan,
        taskDescription,
        taskNote
    } = req.body;
    
    const date = createDateTime();
    var updateNote
    var newState
    var changePlan
    
    let checkPlan = (await this.getTaskPlan(taskName, application) !== addToPlan)
    if (checkPlan){
        if(addToPlan.length === 0 || addToPlan === "none" || !addToPlan ){
            changePlan = null
        } else {
            changePlan = JSON.stringify(addToPlan)
        }
    }

    if (updateType === "promote"){
        switch (currentState) {
            case "open":
                newState = "toDoList"
                break;
            case "toDoList":
                newState = "doing"
                break;
            case "doing":
                newState = "done"
                break;
            case "done":
                newState = "close"
                break;
        }
    } else {
        switch (currentState) {
            case "doing":
                newState = "toDoList"
                break;
            case "done":
                newState = "doing"
                break;
        }
    }

    // let existingAudit = await this.getTaskAudit(taskName,application);
    updateNote = JSON.stringify(`[${username}] moved "${taskName}" to ${newState} on ${date} \nTask State: ${newState}\n${taskNote?"\nNotes:\n" + taskNote +"\n" : ""} \n`)

    let sql = `UPDATE task SET ${checkPlan? "task_plan = "+ changePlan +"," : "" } ${taskDescription? "task_description = " + JSON.stringify(taskDescription)+"," : ""} task_state = ${JSON.stringify(newState)} , task_notes = CONCAT(${updateNote}, task_notes), task_owner = ${JSON.stringify(username)} WHERE (task_id = ${JSON.stringify(taskID)})`;
    db.query(sql, (error, results) => {
        if (error) {
            console.log(error)
            res.send("Error");
        } else {
            console.log("success")
            res.send("success");
        }
    })
});

//Update task
exports.updateTask = catchAsyncErrors ( async (req, res, next) => {
    const {
        username, 
        application,
        currentState,
        taskID,
        taskName,
        addToPlan,
        taskDescription,
    } = req.body;

    const date = createDateTime();
    var addPlan
    var addDesc = taskDescription
    let planChanged
    let descriptionChanged
    let existingPlan = (await this.getTaskPlan(taskName, application))
    let existingDesc = (await this.getTaskDescription(taskName, application))

    if (addToPlan === "none" || !addToPlan.length){
        addPlan = null
    } else {
        addPlan = JSON.stringify(addToPlan)
    }

    let checkPlanChanged = (existingPlan !== addPlan)
    let checkDescChange = (taskDescription.length !== 0 || existingDesc !== taskDescription)

    console.log(checkDescChange)

    if (!checkPlanChanged) {
        planChanged = false
    } else if (checkPlanChanged){
        if(existingDesc !== taskDescription && taskDescription.length === 0){
            addDesc = "none"
        }
        planChanged = true
    }

    if (!checkDescChange) {
        descriptionChanged = false
    } else if (checkDescChange){
        descriptionChanged = true
    }

    if(!planChanged && !taskDescription){
        res.send("no changes");
    } else {
        var updateNote = JSON.stringify(`[${username}] edited "${taskName}" ${planChanged && descriptionChanged?"plan and description":planChanged && !descriptionChanged?"plan":descriptionChanged && !planChanged?"description":""} on ${date} \nTask State: ${currentState}\n${!descriptionChanged?"":!existingDesc.length?"\nPrevious description:\nnone":"\nPrevious description: "+existingDesc}\n\n`)

        // console.log(addPlan)
        let sql = `UPDATE task SET ${addPlan !== existingPlan? "task_plan = "+ addPlan +"," : "" } ${addDesc? "task_description = " + JSON.stringify(addDesc)+"," : ""} task_notes = CONCAT(${updateNote}, task_notes) WHERE (task_id = ${JSON.stringify(taskID)})`;

        db.query(sql, (error, results) => {
            if (error) {
                // console.log(error)
                res.send("Error");
            } else {
                if (addPlan !== existingPlan && !descriptionChanged){
                    res.send("plan change")
                } else if (descriptionChanged && addPlan === existingPlan){
                    res.send("desc change")
                } else {
                    res.send("plan desc");
                }
            }
        })

    }
});

//Testing email
exports.sendTestEmail = catchAsyncErrors( async() => {

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'test@example.com', // sender address
        to: "jiayi.ang98@hotmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

//Send email when task is moved to done state
exports.sendDoneTaskEmail = catchAsyncErrors( async (req, res, next) => {
    const {
        application,
        username,
        taskCreator,
        taskName,
        taskNote,
    } = req.body;

    const date = createDateTime();

    var receiverEmail = JSON.stringify(await getUserEmail(taskCreator));
    if (!receiverEmail.length){
        receiverEmail = "jiayi.ang98@hotmail.com"
    }

    var emailSubject = `A task has been completed in ${application} by ${username}`
    // var emailSubject = `${username} has completed the task ${taskName} in ${application}`
    
    var emailBody = 
    `
    <div>
        <h3>TASK "<span style="text-transform: uppercase;">${application}</span>" IS MOVED TO DONE</h3>
        <h3>[${username}] has moved the task "${taskName}" to DONE on ${date}</h5>
        ${taskNote?"<h5>Notes:</h5><p>" + taskNote + "</p>": ""}
    </div>
    `

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'kanban_app@example.com' , // sender address
        to: receiverEmail , // list of receivers
        subject: emailSubject , // Subject line
        // text: "Hello world?", // plain text body
        html: emailBody , // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})