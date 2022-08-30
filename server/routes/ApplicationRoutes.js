const express = require('express');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const appli = require("../controllers/applicationController");

//Get all tasks
router.route('/apps').get(appli.getApps);

//

module.exports = router;