require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Get all application
exports.getAllApps = catchAsyncErrors ( async (req, res, next) => {
    let sql = `SELECT * FROM application`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
});

//Create application
exports.createApp = catchAsyncErrors ( async (req, res, next) => {
    const { 
        appAcronym,
        appDescription,
        appRNum,
        appStartDate,
        appEndDate,
        permitCreate,
        permitOpen,
        permitToDo,
        permitDoing,
        permitDone
    } = req.body;

    console.log(
        appAcronym,
        appDescription,
        appRNum,
        appStartDate,
        appEndDate,
        permitCreate,
        permitOpen,
        permitToDo,
        permitDoing,
        permitDone
    )

    res.send(
        appAcronym,
        appDescription,
        appRNum,
        appStartDate,
        appEndDate,
        permitCreate,
        permitOpen,
        permitToDo,
        permitDoing,
        permitDone
    )
    
    // let sql = `INSERT INTO application (app_acronym, app_description, app_Rnumber, app_startDate, app_endDate, app_permit_create, app_permit_open, app_permit_toDoList, app_permit_doing, app_permit_done) VALUES (${appAcronym}, ${appDescription}, ${appRNum}, ${appStartDate}, ${appEndDate}, 
    // ${JSON.stringify(permitCreate)}, ${JSON.stringify(permitOpen)}, ${JSON.stringify(permitToDo)}, ${JSON.stringify(permitDoing)}, 
    // ${JSON.stringify(permitDone)})`;
    // db.query(sql, (error, results) => {
    //     if (error) {
    //         res.send("Error");
    //     } else {
    //         res.send(results);
    //     }
    // })
});

//Get specific application tasks and plans
exports.getOneApp = catchAsyncErrors ( async (req, res, next) => {
    const application = await JSON.stringify(req.body.application);

    let sql = `SELECT * FROM application WHERE app_acronym = ${application}`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
});