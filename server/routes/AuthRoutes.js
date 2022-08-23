const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController.js");

//Login
router.route('/login').post(authController.doLogin);

//Create user
// router.route('/users/create').post(users.createUser);
router.route('/users/create').post(authController.createUser);

//Update User
router.route('/users/update/:id').post(authController.updateUser);

//Update User group
router.route('/users/update-group/:id').post(authController.updateUserGroups);

//Refresh User Group
router.route('/users/group/:id').post(authController.refreshUserGroups);

module.exports = router;