const express = require('express');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const tasks = require("../controllers/taskController.js");

//Get all tasks
router.route('/tasks').get(tasks.getTasks);

module.exports = router;