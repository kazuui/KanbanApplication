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

module.exports = router;