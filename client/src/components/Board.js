import React, { useState, useEffect, useContext } from "react";

import TaskPanels from "./taskPanel"
import CreateTaskModal from "./Modals/createTaskModal"

function Board() {

  return (
      <div className="doFlex kanban-board">
        {/* Open */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state state-open">OPEN</h4>

          {/* Create Tasks */}
          <button type="button" className="btn btn-add btn-lg btn-add btn-block" 
          data-bs-toggle="modal" data-bs-target="#createTaskModal">+</button>
          <CreateTaskModal/>
          <TaskPanels/>

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
        {/* <Modals/> */}

      </div>
  )
}

export default Board;