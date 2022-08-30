require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Get all task
exports.getTasks = catchAsyncErrors ( async (req, res, next) => {
    let sql = `SELECT * task WHERE task_app_acronym = test`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
});