const { request, response } = require('express');
require('dotenv/config');
const db = require('../config/db.js');


class Users {
    
    //Encrypt password
    // async encryptPassword(password) {
    //     this.password = await bcrypt.hash(this,password, 10);
    // };



//     constructor(user_id, username, password, email) {
//     this.user_id = user_id;
//     this.username = username;
//     this.password = password;
//     this.email = email;
//     }
//     //add the set and get methods here
//   getUserId() {
//         return this.user_id;
//     }
//   getUsername() {
//         return this.username;
//     }
//   getPassword() {
//         return this.password;
//     }
//   getEmail() {
//         return this.email;
//     }
  
//   setUsername(username) {
//         return this.username = username;
//     }
//   setPassword(password) {
//         return this.password = password;
//     }
//   setEmail(email) {
//         return this.email = email;
//     }
  }
    module.exports = Users;