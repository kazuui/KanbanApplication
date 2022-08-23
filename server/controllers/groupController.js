require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Groups = require("../models/GroupModel.js");

//Get all groups
exports.getGroups = catchAsyncErrors ( async (req, res, next) => {
    let sql = `SELECT * FROM kanban_web_app.group`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
});

//Create group
exports.createGroup = catchAsyncErrors ( async (req, res, next) => {

    const groupName = await JSON.stringify(req.body.groupName);

    let sql = `INSERT INTO kanban_web_app.group (group_name) VALUES (${groupName})`;
    db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
});

//Get group ID by name
// exports.getGroupID = (req, res, next) => {
//     const { groupName } = req.params;

//     let sql = `SELECT * FROM kanban_web_app.group WHERE group_name = ${groupName}`;
//     db.query(sql, (error, results) => {
//         if (error) {
//             res.send("Error");
//         } else {
//             res.send(results);
//         }
//     })
// };