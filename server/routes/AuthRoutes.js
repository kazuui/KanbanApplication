const express = require('express');
const router = express.Router();

const auth = require("../controllers/authController.js");

//Login
router.route('/login').post(auth.doLogin);

//Create user
// router.route('/users/create').post(users.createUser);
router.route('/users/create').post(auth.createUser);

//Update User
router.route('/users/update/:id').post(auth.updateUser);

//Update User group
router.route('/users/update-group/:id').post(auth.updateUserGroups);

//Refresh User Group
router.route('/users/group/:id').post(auth.refreshUserGroups);

//Add New User to Group
router.route('/users/create/add-to-group').post(auth.addUserGroups);

//Access rights
router.route('/user/access-rights').get(auth.getAccessRights);

module.exports = router;