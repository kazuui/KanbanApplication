const express = require('express');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const plans = require("../controllers/planController.js");

//Get all tasks from a specific application
// router.route('/app/tasks/:acronym').get(tasks.getTasksOfApp);

module.exports = router;