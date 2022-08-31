require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Get all task
exports.getTasksOfApp = catchAsyncErrors ( async (req, res, next) => {
    const { id } = req.params;

    let sql = `SELECT * FROM task WHERE task_app_acronym = ${id}`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
});