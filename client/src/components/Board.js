import React, { useState, useEffect, useContext } from "react";

import TaskPanels from "./taskPanel"
import CreateTaskModal from "./Modals/createTaskModal"
import TaskInfoModal from "./Modals/taskInfoModal"

function Board(props) {

  const { tasks, update, plans } = props;

  const [openTasks, setOpenTasks] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [closeTasks, setCloseTasks] = useState([]);

  const [displayedPlans, setDisplayedPlans] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);

  //View Modal
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if (displayedUser) {
  //     setEmail(displayedUser.userEmail);
  //     setUsername(displayedUser.userName);
  //     setPwd(displayedUser.userPwd);
  //     setStatus(displayedUser.userStatus);
  //     setGroup(displayedUser.groupName);
  //   }
  // }, [displayedUser]);

  //Show task info modal
  const handleShowTaskInfo = (e) => {
    if(show){
      setShow(false)
    } else{
      setShow(true);
      const task = tasks.find((task) => task.task_id === e.currentTarget.id);
      console.log(task)
      console.log(e.currentTarget)

      //This selected the other elements like <p> rather than the button
      // console.log(e.target)
    }
  };

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

  useEffect(() => {
    const openArr = tasks.filter((task) => {
      return task.task_state === "open";
    });

    const toDoArr = tasks.filter((task) => {
      return task.task_state === "toDo";
    });

    const doingArr = tasks.filter((task) => {
      return task.task_state === "doing";
    });

    const doneArr = tasks.filter((task) => {
      return task.task_state === "done";
    });

    const closeArr = tasks.filter((task) => {
      return task.task_state === "close";
    });
    setOpenTasks(openArr);
    setToDoTasks(toDoArr);
    setDoingTasks(doingArr);
    setDoneTasks(doneArr);
    setCloseTasks(closeArr);
  }, [tasks])

  return (
      <div className="doFlex kanban-board">
        {/* Open */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-open">OPEN</h4>

          {/* Create Tasks */}
          <button type="button" className="btn btn-add btn-lg btn-add btn-block" 
          data-bs-toggle="modal" data-bs-target="#createTaskModal">+</button>

          <TaskPanels taskState={openTasks} handleShowModal={handleShowTaskInfo}/>

        </div>
        {/* To-do */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-toDO">TO-DO</h4>

          <TaskPanels taskState={toDoTasks} handleShowModal={handleShowTaskInfo}/>

        </div>
        {/* Doing */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-doing">DOING</h4>

          <TaskPanels taskState={doingTasks} handleShowModal={handleShowTaskInfo}/>

        </div>
        {/* Done */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-done">DONE</h4>

          <TaskPanels taskState={doneTasks} handleShowModal={handleShowTaskInfo}/>

        </div>
        {/* Close */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-close">CLOSE</h4>

          <TaskPanels taskState={closeTasks} handleShowModal={handleShowTaskInfo}/>

        </div>

        {/* Modals */}
        <CreateTaskModal plans={plans} updateTasks={update}/>
        
        <TaskInfoModal showModal={show} handleCloseModal={handleShowTaskInfo}/>

      </div>
  )
}

export default Board;