//////////////////////////////// UNUSED CODE ///////////////////

//////////////////// FROM BOARD JS //////////////////////////////

// useEffect(() => {
  //   if (displayedTasks) {
  //     setTaskName(displayedTasks.task_name);
  //     setTaskPlan(displayedTasks.task_plan);
  //     setTaskDescription(displayedTasks.task_description);
  //     setTaskNotes(displayedTasks.task_notes);
  //   }
  // }, [displayedTasks]);

// const handleShowTaskInfo = (e) => {
  //   setShow(true);
  // };
  
  // const handleShowTaskInfo = () => {
  //   show ? setShow(false) : setShow(true);
  // };

  // //Close task info model
  // const handleCloseTaskInfo = (e) =>{
  //   setShow(false);
  // }

//////////////// FROM PRIVATE ROUTE ////////////////////////////
    // user.role.find(role => allowedRoles.include(role))
    //   ? <Outlet/>
    //   : user.username
    //   ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //   : <Navigate to="/" state={{ from: location }} replace />

    // auth?.username
    // ? <Outlet/> 
    //   : <Navigate to="/unauthorized" 
    //   />

    // auth?.isAdmin?.find(admin => isAdmin?.includes(true))
    //   ? <Outlet/> 
    //   : auth?.username
    //     ?<Navigate to="/unauthorized" // state={{ from: location }} replace
    //     />
    //     :<Navigate to="/unauthorized"/>

////////////////////////////////////////////////////////////////
// exports.checkGroupName = async (userid, groupname) => {
//     const query = `SELECT t1.* FROM assignment.user_groups t1 INNER JOIN assignment.groups t2 ON t1.group_id = t2.id WHERE t1.user_id = ? AND t2.name = ?`;
//     const results = await db.promise().query(query, [userid, groupname]);
//     return results[0].length ? true : false;
//   };


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


///////////////////////////////////////////////////////////////////////////

// Get Users and their groups
// exports.getUsersAndGroups = catchAsyncErrors ( async (req, res, next) => {
//     const { id } = req.params;

//     if (id == null) {
//         let sql = "SELECT user.user_id, user.username, user.email, user.status, group_concat(' ', kanban_web_app.group.group_name) AS `group` FROM user LEFT JOIN user_in_group ON user.user_id = user_in_group.user_id LEFT JOIN kanban_web_app.group ON user_in_group.group_id = kanban_web_app.group.group_id GROUP BY user.user_id";
//         db.query(sql, (error, results) => {
//         if (error) {
//             res.send("Error");
//         } else {
//             res.send(results);
//         }
//     })
//     } else {
//         let sql = `SELECT user.user_id, user.password, user.username, user.email, user.status, group_concat(' ', kanban_web_app.group.group_name) AS "group" FROM user LEFT JOIN user_in_group ON user.user_id = user_in_group.user_id LEFT JOIN kanban_web_app.group ON user_in_group.group_id = kanban_web_app.group.group_id WHERE user.user_id = ${id} GROUP BY user.user_id`;
//         db.query(sql, (error, results) => {
//         if (error) {
//             res.send("Error");
//         } else {
//             const [result] = results;
//             res.send(result);
//         }
//     })
//     }

// });

// //Deactivate User
// exports.deactivateUser = (req, res, next) => {

//     const { id } = req.params;

//     let sql = `SELECT status FROM user WHERE user_id = ${id}`;
//     db.query(sql, (error, results) => {
//         const [result] = results;
//         checkStatus = JSON.stringify(result.status);

//         if (checkStatus === "0"){
//             res.send("failed");
//         } else {
//             let sql = `UPDATE user SET status = '0' WHERE (user_id = ${id});`;
//             db.query(sql, (error, results) => {
//                 if (error) {
//                     res.send(error);
//                 } else {
//                     res.send("success");
//                 }
//             });
//         }
//     });
// };

//Get specific user
// exports.getUser = (req, res, next) => {
//     const { id } = req.params;
//     let sql = `SELECT user.user_id, user.username, user.email, user.status, group_concat(kanban_web_app.group.group_name) AS "group" FROM user LEFT JOIN user_in_group ON user.user_id = user_in_group.user_id LEFT JOIN kanban_web_app.group ON user_in_group.group_id = kanban_web_app.group.group_id WHERE user.user_id = ${id} GROUP BY user.user_id`;
//     db.query(sql, (error, results) => {
//         if (error) {
//             res.send("Error");
//         } else {
//             res.send(results);
//         }
//     })
// };

// //Update specific user
// exports.updateUser = catchAsyncErrors ( async (req, res, next) => {
//     const { id } = req.params;
//     console.log(id);

//     const password = JSON.stringify(req.body.password);
//     const email = JSON.stringify(req.body.email);
//     // const groupSelect = req.body.groupSelect;

//     // res.send(groupSelect);

//     bcrypt.hash(password, saltRounds, (err, hash) => {
//         if(err){
//             res.send(err);
//         }else{
//             hashPassword = JSON.stringify(hash);

//             let sql = `UPDATE user SET user.password = ${hashPassword} , user.username = ${email} WHERE user.user_id = ${id}`;
//             db.query(sql, (error, results) => {
//                 if (error){
//                     res.send(results);
//                 } else {
//                     console.log(hashPassword);
//                     console.log(password);
//                     res.send(results);
//                 }
//             });
//         }
//     });

//     // let sql = `UPDATE user SET user.email = ${email}, user.password = ${password} WHERE user.user_id = ${id}`;
//     // db.query(sql, (error, results) => {
//     //     if (error) {
//     //         res.send("Error");
//     //     } else {
//     //         res.send(results);
//     //     }
//     // })
// });

//Create new user
// exports.createUser = catchAsyncErrors ( async (req, res, next) => {
//     const username = JSON.stringify(req.body.username);
//     const password = JSON.stringify(req.body.password);
//     const email = JSON.stringify(req.body.email);
//     const status = 1;

//     if (username === `""` || password === `""`){
//         res.send("Fill in username and password to create new user");
//     } else {
//         let sql = `SELECT username FROM user WHERE username = ${username}`;
//         db.query(sql, (error, results) => {
            
//             const [result] = results;

//             if (error) {
//                 res.send(error);
//             } else if (result != null){
//                 const checkUser = JSON.stringify(result.username);
//                 if (username === checkUser) {
//                     res.send("User already exists");
//                 }
//             } else {
//                 const checkUser = JSON.stringify(result);
//                 if (checkUser == null){
//                     // console.log("User does not exist");
//                     let sql = `INSERT INTO user (username, password, email, status) VALUES (${username}, ${password},${email},${status})`;
//                     db.query(sql, (error, results) => {
//                     if (error){
//                         res.send("Error");
//                     } else {
//                         res.send("User successfully created");
//                     }
//                 });
//                 }
//             };
//         });
//     }
// });

//Login
// exports.doLogin = catchAsyncErrors ( async (req, res, next) => {
//   const username = await JSON.stringify(req.body.username);
//   const password = await JSON.stringify(req.body.password);

//     if (username === `""` || password === `""`) {
//         if (username === `""` && password !==`""`) {
//             res.send("username empty");
//         } else if (username !== `""` && password === `""`){
//             res.send("password empty")
//         } else {
//             res.send("username and password empty")
//         }
//     } else {
//         let sql = `SELECT password FROM user WHERE username = ${username}`;
//         db.query(sql, (error, results) => {
//             if (error || !results.length) {
//                 res.send("Wrong password/username");
//             } else {
//                 const [result] = results;
//                 // const checkPassword = JSON.stringify(result.password);
//                 const checkPassword = result.password;

//                 bcrypt.compare(password, checkPassword).then(check => {
//                     console.log(check);

//                     console.log(password);
//                     console.log(checkPassword);

//                     if (check !== true){
//                         res.send("false");   
//                     }else{
//                         res.send("true");   
//                     }

//                 })

//                 // if (password !== checkPassword) {
//                 //     res.send("Wrong password/username");
//                 // } else {
//                 //     res.send("Account matched");
//                 // }
//             }
//         })
//     };
// });

//Get all users and their groups or specific user
// exports.getUsers = (req, res, next) => {
//     const { id } = req.params;

//     if (id == null) {
//         console.log("no id");
//     }

//     let sql = `SELECT * FROM user`;
//     db.query(sql, (error, results) => {
//         if (error) {
//             res.send("Error");
//         } else {
//             res.send(results);
//         }
//     })
// };

//innerjoin 3 tables
// SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
// FROM ((Orders
// INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
// INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);