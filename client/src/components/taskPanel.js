import React, { useState, useEffect, useContext } from "react";

import TaskInfoModal from "./Modals/taskInfoModal"

function taskPanel() {

  // document.getElementById("helloHello").style.backgroundColor = "lightblue";

  return (
    <div>
    <button type="button" className="task-button" data-bs-toggle="modal" data-bs-target="#taskInfoModal">
      <div className="task-panel">
        <div className="top-section doFlex">
          <div id="helloHello" className="indicate-colour"></div>
          <div className="task-info">
            <p className="task-owner-name">Owner: XXXX</p>
            <p>Sprint 1</p>
            <h4>Task</h4>
            <p>Description...</p>
          </div>
        </div>
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
    </button>
    </div>
  )
}

export default taskPanel;