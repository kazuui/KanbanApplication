require('dotenv/config');
const db = require('../config/db.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const UserModel = require ('../models/UserModel');

//middleware
function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] //if there is an authHeader return the following

    if (token == null) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            res.sendStatus(403)
        }
        req.user = user
        next();
    })
}

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
                    if (check) {
                        const user = results;
                        result.password = undefined;
                        console.log(check, result);
                        
                        const User = { name: req.body.username}
                        const accessToken = jwt.sign(User , process.env.ACCESS_TOKEN_SECRET);
                        res.json({ accessToken: accessToken })
                      }

                      return null;
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
});

//Update specific user
exports.updateUser = catchAsyncErrors ( async (req, res, next) => {
    const { id } = req.params;

    const password = JSON.stringify(req.body.password);
    const email = JSON.stringify(req.body.email);
    // const groupSelect = req.body.groupSelect;
    // res.send(groupSelect);

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
                        // console.log(hashPassword);
                        // console.log(password);
                        res.send("success");
                    }
                });
            }
        });
    }
});