require('dotenv/config');
const db = require('../config/db.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const e = require('express');

//Other functions
const { checkGroup, createDateTime } = require('../helpers/helpers');
const { getSingleTask, getTaskAmount } = require('./taskController');
const { getOneApp } = require("./applicationController");


//Create a new task
exports.CreateTask = catchAsyncErrors ( async (req, res, next) => {

    const { username, password } = req.body;
    var app_acronym = req.body.app_acronym;
    var task_name = req.body.task_name;
    var task_note = req.body.task_note;
    var task_desc = req.body.task_desc;

    var appCreateGroups
    var userInGroup

    //If username and password not entered
    if(!username || !password){
        res.status(400).send({
            code:400
        })
    };

    //If app_acronym or taks_name not entered
    if(!app_acronym || !task_name){
        res.status(400).send({
            code:400
        })
    };

    //Check username
    let sql = `SELECT * FROM user WHERE username = ${JSON.stringify(username)}`;
    var userResults = await db.promise().query(sql)
    userResults = userResults[0][0]
    if(!userResults){
        res.status(401).send({
            code:401
        })
    } else {
        //Check password
        const dbPassword = userResults.password;
        const checkPassword = await bcrypt.compare(JSON.stringify(password), dbPassword)
        if(!checkPassword){
            res.status(401).send({
                code:401
            })
        };
    };

    // Check if there is app exists
    const appData = await getOneApp(app_acronym);
    if(!appData){
        console.log("app does not exists")
        res.status(400).send({
            code:400
        })
    } else {
        // Get app create groups
        appCreateGroups = JSON.parse(appData.app_permit_create);

        //check if user is in group
        for(var i = 0 ; i < appCreateGroups.length; i++){
            let groupName = appCreateGroups[i]

            userInGroup = await checkGroup(groupName, username);
            if(userInGroup.length){
                break
            }
        }
        //If user not in group
        if(!userInGroup.length){
            res.status(403).send({
                code:403
            })
        }
    }

    //Check if task name exist
    const existingTask = await getSingleTask(task_name, app_acronym);
    if(existingTask){
        res.status(400).send({
            code:400
        })
    } else {
        //Create task
        const taskAmount = await getTaskAmount(app_acronym);

        const taskID = `${appData.app_acronym}_${+appData.app_Rnumber + taskAmount}`;
        const taskState= "open";

        const createDate = new Date().toISOString().slice(0, 10);
        const date = createDateTime();

        const createTaskNote = JSON.stringify(`[${username}] created task "${task_name}" on ${date} \nTask state: ${taskState}\n${task_note?"\nNotes:\n" + task_note : ""}`);

        let sql = `INSERT INTO task (task_id, task_name, task_description, task_notes, task_app_acronym, task_state, task_creator, task_owner,  task_createDate) VALUES(${JSON.stringify(taskID)},${JSON.stringify(task_name)},${!task_desc?null:JSON.stringify(task_desc)},${createTaskNote},${JSON.stringify(app_acronym)},${JSON.stringify(taskState)},${JSON.stringify(username)}, ${JSON.stringify(username)}, ${JSON.stringify(createDate)})`;
        db.query(sql, (error, results) => {
            console.log(error)
            if (error) {
                res.status(500).send({
                    code:500
                })
            } else {
                res.status(200).send({
                    code:200
                })
            }
        })
    }
})

//Retrieve tasks in a particular state
exports.GetTaskbyState = catchAsyncErrors ( async (req, res, next) => {
    res.send('Get Task by State')
})

//Approve a task from “Doing to Done” state
exports. PromoteTask2Done = catchAsyncErrors ( async (req, res, next) => {
    res.send('Promote Task to Done')
})