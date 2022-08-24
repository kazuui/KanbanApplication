require('dotenv/config');
const db = require('../config/db.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const UserModel = require ('../models/UserModel');

//middleware
// function authenticateToken (req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1] //if there is an authHeader return the following

//     if (token == null) {
//         res.sendStatus(401);
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err){
//             res.sendStatus(403)
//         }
//         req.user = user
//         next();
//     })
// }

//Min 8 Max 10; Aplha, Num , Special
const validPassword = (password) => {
    if (password.length < 8 || password.length > 10) return false; //check for password length
    if (!/[0-9]/g.test(password)) return false; //check for numbers
    if (!/[a-zA-Z]/.test(password)) return false; //check for alphabets
    if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) return false; //check for special characters
  
    return true;
  };

//Login
exports.doLogin = catchAsyncErrors ( async (req, res, next) => {
    const username = await JSON.stringify(req.body.username);
    const password = await JSON.stringify(req.body.password);
  
      if (username === `""` || password === `""`) {
          if (username === `""` && password !==`""`) {
              res.send("username empty");
          } else if (username !== `""` && password === `""`){
              res.send("password empty")
          } else {
              res.send("username and password empty")
          }
      } else {
          let sql = `SELECT * FROM user WHERE username = ${username}`;
          db.query(sql, (error, results) => {
              if (error || !results.length) {
                  res.send("Wrong password/username");
              } else {
                  const [result] = results;
                  // const checkPassword = JSON.stringify(result.password);
                  const checkPassword = result.password;
  
                  bcrypt.compare(password, checkPassword).then(check => {
                    if (!check) {
                        res.send("Wrong password/username");
                      } else {
                        const user = results;
                        result.password = undefined;
                        console.log(check, result);
                        
                        const User = { name: req.body.username}
                        const accessToken = jwt.sign(User , process.env.ACCESS_TOKEN_SECRET);
                        res.json({ accessToken: accessToken })
                      }
                    //   return null;
                  })
              }
          })
      };
  });


//Create new user 
exports.createUser = catchAsyncErrors ( async (req, res, next) => {
    const username = JSON.stringify(req.body.username);
    const password = JSON.stringify(req.body.password);
    const email = JSON.stringify(req.body.email);
    const status = 1;

    if (username === `""` || password === `""`){
        res.send("Fill in username and password to create new user");
    } else {

        const checkPasswordValid = validPassword(password);

        if(checkPasswordValid === false){
            res.send("password criteria")
        } else {
            let sql = `SELECT username FROM user WHERE username = ${username}`;
            db.query(sql, (error, results) => {
                if (error){
                    res.send(error);
                } else {
                    if (results.length){
                        res.send("existed");
                    } else {
                        bcrypt.hash(password, saltRounds, (error, hash) => {
                            if (error){
                                res.send(error);
                            } else {
                                hashPassword = JSON.stringify(hash);
                                let sql = `INSERT INTO user (username, password, email, status) VALUES (${username}, ${hashPassword},${email},${status})`;
                                db.query(sql, (error, results) => {
                                    if (error){
                                        res.send("Error");
                                    } else {
                                        res.send("success");
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
});

//Update specific user
exports.updateUser = catchAsyncErrors ( async (req, res, next) => {
    const { id } = req.params;

    const password = JSON.stringify(req.body.password);
    const email = JSON.stringify(req.body.email);
    // const groupUpdate = req.body.selectedGroups;

    if (password == `""`) {
        let sql = `UPDATE user SET user.email = ${email} WHERE user.user_id = ${id}`;
        db.query(sql, (error, results) => {
            if (error){
                res.send("failed");
            } else {
                res.send("success");
            }
        });

    } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err){
                res.send(err);
            }else{
                hashPassword = JSON.stringify(hash);
    
                let sql = `UPDATE user SET user.password = ${hashPassword} , user.email = ${email} WHERE user.user_id = ${id}`;
                db.query(sql, (error, results) => {
                    if (error){
                        res.send("failed");
                    } else {
                        res.send("success");
                    }
                });
            }
        });
    }
});

//Delete user groups
exports.refreshUserGroups = catchAsyncErrors ( async (req, res, next) => {
    const { id } = req.params;
    //remove all groups from user first
    let sql = `DELETE FROM user_in_group WHERE user_id = ${id};`
    db.query(sql, (error, results) => {
            if (error){
                res.send("failed");
            } else {
                res.send("success");
            }
        });
});

//Update user groups
exports.updateUserGroups = catchAsyncErrors ( async (req, res, next) => {
    const { id } = req.params;
    const groupID = req.body.getGroupID;

    let sql = `INSERT INTO user_in_group (user_id, group_id) VALUES (${id}, ${groupID})`;
        db.query(sql, (error, results) => {
            if (error){
                res.send("failed");
            } else {
                res.send("success");
            }
        });
});

//Add Users to groups
exports.addUserGroups = catchAsyncErrors ( async (req, res, next) => {

    const username = JSON.stringify(req.body.username);
    const groupID = req.body.getGroupID;

    var thisUserID = "";

    //find userID
    let findID = `SELECT user_id FROM user WHERE username = ${username}`
    db.query(findID, (error, results) => {
        if (error){
            res.send("failed");
        } else {
            const [result] = results;
            thisUserID= (result.user_id);
            
            //Insert user
            let sql = `INSERT INTO user_in_group (user_id, group_id) VALUES (${thisUserID}, ${groupID})`;
            db.query(sql, (error, results) => {
                if (error){
                    res.send("failed");
                } else {
                    res.send("success");
                }
            });
        }
    });
});