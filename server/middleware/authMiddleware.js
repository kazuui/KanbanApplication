const jwt = require('jsonwebtoken');
const authen = require('../controllers/authController');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Check if user is authenticated
// exports.isAuthenticatedUser = catchAsyncErrors ( async(req, res, next) => {
//   let token;

//   if(req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
    
//   }
// })
