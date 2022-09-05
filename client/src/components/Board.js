import React, { useState, useEffect, useContext } from "react";

// import TaskPanels from "./taskPanel"
import CreateTaskModal from "./Modals/createTaskModal"
import TaskInfoModal from "./Modals/taskInfoModal"

function Board(props) {

  

  return (
      <div className="doFlex kanban-board">
        {/* Open */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-open">OPEN</h4>

          {/* Create Tasks */}
          <button type="button" className="btn btn-add btn-lg btn-add btn-block" 
          data-bs-toggle="modal" data-bs-target="#createTaskModal">+</button>
          {/* <TaskPanels/> */}
          
          <div>
            <div className="task-panel">
              <button type="button" className="task-button" data-bs-toggle="modal" data-bs-target="#taskInfoModal">
                <div className="top-section doFlex">
                  <div id="helloHello" className="indicate-colour"></div>
                  <div className="task-info">
                    <p className="task-owner-name">Owner: XXXX</p>
                    <p>Sprint 1</p>
                    <h4>Task</h4>
                    <p>Description...</p>
                  </div>
                </div>
              </button>
              <div className="task-navigation">
                {/* Left button */}
                <button type="button" className="btn-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                  </svg>
                </button>

                {/* Right Button */}
                <button type="button" className="btn-arrow btn-align-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
        {/* To-do */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-toDO">TO-DO</h4>
        </div>
        {/* Doing */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-doing">DOING</h4>
        </div>
        {/* Done */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-done">DONE</h4>
        </div>
        {/* Close */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-close">CLOSE</h4>
        </div>

        {/* Modals */}
        <CreateTaskModal/>
        <TaskInfoModal/>

      </div>
  )
}

export default Board;