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

  //View Modal
  const [show, setShow] = useState(false);

  //Show task info modal
  const handleShowTaskInfo = (e) => {
    setShow(true);
    const task = tasks.find((task) => task.task_id === e.target.id);
    // setDisplayedUser(user);
  };

  return (
      <div className="doFlex kanban-board">
        {/* Open */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-open">OPEN</h4>

          {/* Create Tasks */}
          <button type="button" className="btn btn-add btn-lg btn-add btn-block" 
          data-bs-toggle="modal" data-bs-target="#createTaskModal">+</button>

          <TaskPanels taskState={openTasks} showModal={handleShowTaskInfo}/>

        </div>
        {/* To-do */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-toDO">TO-DO</h4>

          <TaskPanels taskState={toDoTasks} showModal={handleShowTaskInfo}/>

        </div>
        {/* Doing */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-doing">DOING</h4>

          <TaskPanels taskState={doingTasks} showModal={handleShowTaskInfo}/>

        </div>
        {/* Done */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-done">DONE</h4>

          <TaskPanels taskState={doneTasks} showModal={handleShowTaskInfo}/>

        </div>
        {/* Close */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-close">CLOSE</h4>

          <TaskPanels taskState={closeTasks} showModal={handleShowTaskInfo}/>

        </div>

        {/* Modals */}
        <CreateTaskModal plans={plans} updateTasks={update}/>
        <TaskInfoModal show={show}/>

      </div>
  )
}

export default Board;