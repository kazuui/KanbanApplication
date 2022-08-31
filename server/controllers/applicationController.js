require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Get all task
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