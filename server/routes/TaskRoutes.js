const express = require('express');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const tasks = require("../controllers/taskController.js");

// Testing
// router.get("/apps/tasks", (req,res) => {
//     res.send("Task route successful");
// });

//Get all tasks from a specific application
router.route('/apps/tasks/:acronym').get(tasks.getTasksOfApp);

//Create task of application
router.route('/apps/tasks/create').post(tasks.createTask);

//Update task in same state
router.route('/apps/tasks/update').post(tasks.updateTask);

//Update task in same state
router.route('/apps/tasks/move').post(tasks.moveTask);

//Send test email
router.route('/test-email').post(tasks.sendTestEmail);

//Send email when task is done
router.route('/task/send-email').post(tasks.sendDoneTaskEmail);

module.exports = router;