const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const groups = require("../controllers/groupController.js");

//Get groups
router.route('/groups').get(groups.getGroups);

//Create group
router.route('/groups/create').post(groups.createGroup);

module.exports = router;