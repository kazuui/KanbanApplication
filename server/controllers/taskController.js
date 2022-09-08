require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Get task Rnumber
// exports.getTaskAudit = catchAsyncErrors ( async (task_name,task_app_acronym) => {
//     let sql = `SELECT task_notes FROM kanban_web_app.task WHERE task_name = ${task_name} AND task_app_acronym = ${JSON.stringify(task_app_acronym)}`;

//     const results = await db.promise().query(sql);
//     return results[0][0]
// });

//Get Audit note of task
exports.getTaskAudit = catchAsyncErrors ( async (task_name,task_app_acronym) => {
    let sql = `SELECT task_notes FROM kanban_web_app.task WHERE task_name = ${task_name} AND task_app_acronym = ${JSON.stringify(task_app_acronym)}`;

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

    const taskID = "";

    // const date = createDateTime();
    const createTaskNote = `${username} created ${taskName} on date?? \n${taskNote}`

    console.log(createTaskNote);
    res.send(createTaskNote);

    let sql = `INSERT INTO task (task_id, task_name, task_description, task_notes, task_plan, task_app_acronym, task_state, task_creator, task_owner, task_createDate) VALUES()`;
    // db.query(sql, (error, results) => {
    //     if (error) {
    //         res.send("Error");
    //     } else {
    //         res.send(results);
    //     }
    // })
});