import React, { useState, useEffect, useContext } from "react";
import Page from '../../components/Page';

function Home() {

  return (
    <Page title="Home" wide={true}>
      <div className="align-items-center">
        <p className="lead text-muted display-3-center">What's currently happening...</p>
        <div className="col-lg-12 py-lg-5 center_align">
          
          <p className="display-3-center">Kanban board here</p>
        </div>
      </div>
    </Page>
  )
}

export default Home;