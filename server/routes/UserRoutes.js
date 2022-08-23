const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv/config');
const db = require('../config/db.js');
const users = require("../controllers/userController.js");

// Testing
router.post("/user", (req,res) => {
    res.send({ data: "User area"});
});

//Get all users
router.route('/users').get(users.getUsersAndGroups);

//Get specific user
router.route('/users/:id').get(users.getUsersAndGroups);

//Delete specific user (User will still be in database but inactive)
router.route('/users/deactivate/:id').post(users.deactivateUser);

//Create user
// router.route('/users/create').post(users.createUser);


module.exports = router;