const express = require('express');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const tasks = require("../controllers/taskController.js");

//Get all tasks from a specific application
router.route('/apps/tasks/:id').get(tasks.getTasksOfApp);

module.exports = router;