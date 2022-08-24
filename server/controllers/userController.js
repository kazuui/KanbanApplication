require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//User Model
const UserModel = require("../models/UserModel.js");

// Get Users and their groups
exports.getUsersAndGroups = catchAsyncErrors ( async (req, res, next) => {
    const { id } = req.params;

    if (id == null) {
        let sql = "SELECT user.user_id, user.username, user.email, user.status, group_concat(' ', kanban_web_app.group.group_name) AS `group`, group_concat(' ', kanban_web_app.group.group_id) AS `group_id` FROM user LEFT JOIN user_in_group ON user.user_id = user_in_group.user_id LEFT JOIN kanban_web_app.group ON user_in_group.group_id = kanban_web_app.group.group_id GROUP BY user.user_id";
        db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            res.send(results);
        }
    })
    } else {
        let sql = `SELECT user.user_id, user.username, user.email, user.status, kanban_web_app.group.group_name, kanban_web_app.group.group_id FROM user LEFT JOIN user_in_group ON user.user_id = user_in_group.user_id LEFT JOIN kanban_web_app.group ON user_in_group.group_id = kanban_web_app.group.group_id WHERE user.user_id =${id}`;
        db.query(sql, (error, results) => {
        if (error) {
            res.send("Error");
        } else {
            // const [result] = results;
            res.send(results);
        }
    })
    }

});

//Deactivate User
exports.deactivateUser = (req, res, next) => {

    const { id } = req.params;

    let sql = `SELECT status FROM user WHERE user_id = ${id}`;
    db.query(sql, (error, results) => {
        const [result] = results;
        checkStatus = JSON.stringify(result.status);

        if (checkStatus === "0"){
            res.send("failed");
        } else {
            let sql = `UPDATE user SET status = '0' WHERE (user_id = ${id});`;
            db.query(sql, (error, results) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send("success");
                }
            });
        }
    });
};