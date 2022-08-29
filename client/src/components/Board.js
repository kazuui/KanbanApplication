import React, { useState, useEffect, useContext } from "react";

import TaskPanels from "./taskPanel"

function Board() {

  return (
      <div className="doFlex kanban-board">
        {/* Open */}
        <div className="col-lg-3 kanban-panel state-open">
          <h4 className="display-3-center kanban-state">OPEN</h4>
          <TaskPanels/>
        </div>
        {/* To-do */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state">TO-DO</h4>
        </div>
        {/* Doing */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state">DOING</h4>
        </div>
        {/* Done */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state">DONE</h4>
        </div>
        {/* Close */}
        <div className="col-lg-3 kanban-panel">
          <h4 className="display-3-center kanban-state">CLOSE</h4>
        </div>
      </div>
  )
}

export default Board;