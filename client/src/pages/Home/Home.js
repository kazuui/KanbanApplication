import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Page from '../../components/Page';

import ApplicationBoard from "../../components/Board"

function Home() {

  const handleAdd = () => {

  }

  return (
    <div title="Home" wide={true} className="py-md-5">
      <div className="align-items-center">
        <p className="lead text-muted display-3-center">What's currently happening...</p>
          {/* <div className="col-lg-12 py-lg-3 center_align">
          <p className="display-3-center">Kanban board here</p>
        </div> */}
      </div>
      <div className="doFlex">
        {/* Application Panel */}
        <div className="col-lg-2 application-panel">
          <button className="btn btn-lg btn-add btn-block create-app" onClick={handleAdd}> + </button>

          <div className="py-lg-3 center_align text-align-center">
            <p className="app-items"><Link to="#">{" "}Application 1{" "}</Link></p>
            <p className="app-items"><Link to="#">{" "}Application 2{" "}</Link></p>
            <p className="app-items"><Link to="#">{" "}Application 3{" "}</Link></p>
          </div>
        </div>
        <div className="col-lg-8 py-lg-4">
          <ApplicationBoard/>
        </div>
      </div>
    </div>
  )
}

export default Home;