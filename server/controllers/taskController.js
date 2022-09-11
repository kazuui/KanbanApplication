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
    return results[0][0]
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

        const createTaskNote = JSON.stringify(`[${username}] created task "${taskName}" on ${date} \nCurrent state: ${taskState} 
        \n${taskNote? "Notes:\n" + taskNote : ""}`);

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

//Update task
exports.updateTask = catchAsyncErrors ( async (req, res, next) => {
    const { acronym } = req.params;

    // let sql = `SELECT * FROM task WHERE task_app_acronym = "${acronym}"`;
    // db.query(sql, (error, results) => {
    //     if (error) {
    //         res.send("Error");
    //     } else {
    //         res.send(results);
    //     }
    // })
});