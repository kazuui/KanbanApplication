import React, { useState, useEffect, useContext } from "react";

import TaskPanels from "./taskPanel"
import CreateTaskModal from "./Modals/createTaskModal"
import TaskInfoModal from "./Modals/taskInfoModal"

function Board(props) {

  const { tasks } = props;

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

  return (
      <div className="doFlex kanban-board">
        {/* Open */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-open">OPEN</h4>

          {/* Create Tasks */}
          <button type="button" className="btn btn-add btn-lg btn-add btn-block" 
          data-bs-toggle="modal" data-bs-target="#createTaskModal">+</button>

          <TaskPanels taskState={openTasks}/>

        </div>
        {/* To-do */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-toDO">TO-DO</h4>

          <TaskPanels taskState={toDoTasks}/>

        </div>
        {/* Doing */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-doing">DOING</h4>

          <TaskPanels taskState={doingTasks}/>

        </div>
        {/* Done */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-done">DONE</h4>

          <TaskPanels taskState={doneTasks}/>

        </div>
        {/* Close */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-close">CLOSE</h4>

          <TaskPanels taskState={closeTasks}/>

        </div>

        {/* Modals */}
        <CreateTaskModal/>
        <TaskInfoModal/>

      </div>
  )
}

export default Board;