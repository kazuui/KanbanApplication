require('dotenv/config');
const db = require('../config/db.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Check if user is in a specific group
exports.checkUserGroup = async (id, groupName) => {
    let sql = `SELECT user.user_id, user.username, kanban_web_app.group.group_id, 
    kanban_web_app.group.group_name FROM user LEFT JOIN user_in_group ON user.user_id = user_in_group.user_id 
    LEFT JOIN kanban_web_app.group ON user_in_group.group_id = kanban_web_app.group.group_id 
    WHERE kanban_web_app.group.group_name = ${groupName} AND user.user_id = ${id}`;
    
    db.query(sql, (error, results) => {
        if (error) {
            return ("Error");
        } else {
            // if(results)
            console.log(results);
        }
    })
};