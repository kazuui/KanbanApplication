//////////////////////////////// UNUSED CODE ///////////////////

////////////////////////// FROM task information js ///////////////
{/* <Select
  labelId="demo-multiple-name-label"
  id="demo-multiple-name"
  value={addToPlan.length !== 0 ? addToPlan :"none"}
  onChange={handlePlanChange}
  input={<OutlinedInput label="Add to Plan" />}
  MenuProps={MenuProps}
>
  <MenuItem key={"none"} value={"none"}>None</MenuItem>
  {plans.map((plan) => (
    <MenuItem key={plan.plan_MVP_name} value={plan.plan_MVP_name}>
      {plan.plan_MVP_name}
    </MenuItem>
  ))}
</Select> */}

// Testing Modal
    // <div className="modal fade" id="taskInfoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div className="modal-dialog modal-lg">
    //     <div className="modal-content">
    //         <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLabel">Task Info</h5>
    //         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>

    //         <div className="modal-body">
    //           <form>
    //             <div className="form row">
    //               {/* Left */}
    //               <div className="col-6">
    //                 <div className="form-row py-lg-3">
    //                   <div className="col-12">
    //                     <label className="" htmlFor="task-name">Task Name</label>
    //                     <input id="task-name" type="text" className="form-control"/>
    //                   </div>
    //                 </div>
    //                 <div className="form-row py-lg-2">
    //                   <div className="col-12">
    //                     <Box sx={{ minWidth: 120 }} className="py-md-2">
    //                       <FormControl fullWidth>
    //                         <InputLabel id="demo-simple-select-label">Add To Plan</InputLabel>
    //                         <Select
    //                           labelId="demo-simple-select-label"
    //                           id="demo-simple-select"
    //                           defaultValue={10}
    //                           label="Add To Plan"
    //                           onChange={handleChange}>
    //                           <MenuItem value={10}>Application 1</MenuItem>
    //                           <MenuItem value={20}>Application 2</MenuItem>
    //                           <MenuItem value={30}>Application 3</MenuItem>
    //                         </Select>
    //                       </FormControl>
    //                     </Box>
    //                   </div>
    //                 </div>
    //               </div>

    //               {/* Right */}
    //               <div className="col-6 py-lg-3">
    //                 <div className="form-group">
    //                   <label htmlFor="app-description">Task Description</label>
    //                   <textarea className="form-control" id="app-description" rows="5"></textarea>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="form-row">
    //               <div className="col-12">
    //                 <div className="accordion accordion-flush" id="accordionFlushExample">
    //                   <div className="accordion-item">
    //                     <h2 className="accordion-header" id="flush-headingOne">
    //                       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
    //                         Task Notes
    //                       </button>
    //                     </h2>
    //                     <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    //                       <div className="accordion-body">
    //                         <textarea className="form-control" id="app-description" rows="5" defaultValue="Hello" disabled></textarea>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>

    //               </div>
    //             </div>

    //           </form>
    //         </div>

    //         <div className="modal-footer">
    //         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //         {/* <button type="button" className="btn btn-primary">Create</button> */}
    //         </div>
    //     </div>
    //     </div>
    // </div>

////////////////////////// FROM HOME JS ////////////////////////

  // const accessRights = async(apps) => {
  //   var accessArr = [];

  //   //Loop app data
  //   for(var i = 0 ; i < apps.length; i++){
  //     let currentApp = apps[i]
  //     let appName = currentApp.app_acronym;
  //     //Get permit data
  //     let permitData = Object.entries(currentApp).slice(5, 10)

  //     let app = {app: appName}

  //     //Loop app states
  //     for(var x = 0 ; x < permitData.length; x++){
        
  //       var stateName

  //       switch (permitData[x][0]) {
  //         case "app_permit_create":
  //           stateName = "create"
  //           break;
  //         case "app_permit_open":
  //           stateName = "open"
  //           break;
  //         case "app_permit_toDoList":
  //           stateName = "toDoList"
  //           break;
  //         case "app_permit_doing":
  //           stateName = "doing"
  //           break;
  //         case "app_permit_done":
  //           stateName = "done"
  //           break;
  //       }

  //       let stateGroups = JSON.parse(permitData[x][1])
  //       let accessOutcome

  //       //Check if user is in state groups
  //       for(var a = 0 ; a < stateGroups.length; a++){

  //         let groupName = stateGroups[a];
  //         let username = (await JSON.parse(sessionStorage.getItem('user'))).username

  //         let response = await axios.post('/users/check-group', {
  //           groupName,
  //           username
  //         })

  //         if(response.data === true){
  //           accessOutcome = true
  //           break
  //         } else if (response.data === false){
  //           accessOutcome = false
  //         }
  //       }
  //       //Set state access
  //       app[stateName] = accessOutcome
  //     }
  //     accessArr.push(app)
  //   }
  //   console.log(accessArr)
  // }

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