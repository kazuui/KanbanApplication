require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Get one Application
exports.getOneApp = catchAsyncErrors ( async (appAcronym) => {
    let sql = `SELECT * FROM kanban_web_app.application WHERE app_acronym = ${JSON.stringify(appAcronym)}`;

    const results = await db.promise().query(sql);
    return results[0][0]
});

//Get specific application tasks and plans
// exports.getOneApp = catchAsyncErrors ( async (req, res, next) => {
//     const application = await JSON.stringify(req.body.application);

//     let sql = `SELECT * FROM application WHERE app_acronym = ${application}`;
//     db.query(sql, (error, results) => {
//         if (error) {
//             res.send("Error");
//         } else {
//             res.send(results);
//         }
//     })
// });


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
    // const appAcronym = await JSON.stringify(req.body.appAcronym);
    // const permitCreate = await JSON.stringify(req.body.permitCreate);
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

    const existingApplication = await this.getOneApp(appAcronym);

    if(existingApplication){
        console.log("App acronym already exists")
        res.send("App acronym already exists");
    } else {
        
        // let sql = `INSERT INTO kanban_web_app.application (app_acronym, app_permit_create) VALUES (${appAcronym}, '${permitCreate}')`
    
        let sql = `INSERT INTO application (app_acronym, app_description, app_Rnumber, app_startDate, app_endDate, app_permit_create, app_permit_open, app_permit_toDoList, app_permit_doing, app_permit_done) VALUES (${JSON.stringify(appAcronym)}, 
        ${JSON.stringify(appDescription)}, ${appRNum}, ${JSON.stringify(appStartDate)}, ${JSON.stringify(appEndDate)}, 
        '${JSON.stringify(permitCreate)}', '${JSON.stringify(permitOpen)}', '${JSON.stringify(permitToDo)}', '${JSON.stringify(permitDoing)}', 
        '${JSON.stringify(permitDone)}')`;
        db.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.send("Error");
            } else {
                console.log("done")
                res.send(results);
            }
        })
    }
});