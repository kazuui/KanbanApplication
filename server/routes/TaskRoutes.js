const express = require('express');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const task = require("../controllers/taskController.js");

// Testing
// router.get("/apps/tasks", (req,res) => {
//     res.send("Task route successful");
// });

//Get all tasks from a specific application
router.route('/apps/tasks/:acronym').get(task.getTasksOfApp);

//Create task of application
router.route('/apps/tasks/create').post(task.createTask);

module.exports = router;