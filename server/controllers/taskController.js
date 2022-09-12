require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const { getOneApp } = require("./applicationController");
const { createDateTime } = require("../helpers/helpers");

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

//Get task description
// exports.getTaskDescription = catchAsyncErrors ( async (task_name, task_app_acronym) => {
//     let sql = `SELECT task_description FROM kanban_web_app.task WHERE task_name = ${JSON.stringify(task_name)} AND task_app_acronym = ${JSON.stringify(task_app_acronym)}`;

//     const results = await db.promise().query(sql);
//     return ((results[0][0]).task_description)
// });

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

    if(existingTask){
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
        if(!addToPlan || addToPlan === "none" ){
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
        updateType,
        currentState,
        taskID,
        taskName,
        addToPlan,
        taskDescription,
        taskNote
    } = req.body;

    //To add update notes

    let checkPlan = await this.getTaskPlan(taskName, application);
    let planChange
    let descriptionChange
    const date = createDateTime();

    if (!taskDescription.length && !addToPlan.length){
        res.status(200).send("no changes")
    } else if (checkPlan !== addToPlan) {
        if (addToPlan) {
            let sql = `UPDATE task SET task_plan = ${JSON.stringify(addToPlan)} WHERE (task_id = ${JSON.stringify(taskID)})`;
            db.query(sql, (error, results) => {
                if (error) {
                    res.send("Error");
                } else {
                    planChange = true
                }
            })
        }
        
        if (taskDescription){
            let sql = `UPDATE task SET task_plan = ${JSON.stringify(addToPlan)} WHERE (task_id = ${JSON.stringify(taskID)})`;
            db.query(sql, (error, results) => {
                if (error) {
                    res.send("Error");
                } else {
                    descriptionChange = true
                }
            })
        }
    }

    if (planChange && descriptionChange){
        res.send("all success")
    } else if (planChange){
        res.send("plan success")
    } else if (descriptionChange) {
        res.send("description success")
    }
});