import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Page from '../../components/Page';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

//Components
import ApplicationBoard from "../../components/Board"
import CreateAppModal from "../../components/Modals/createAppModal"
import CreatePlanModal from "../../components/Modals/createPlanModal"
import { height } from "@mui/system";

function Home() {
  document.title = `Home | Task Management App`;

  const [application, setApplication] = React.useState('');
  const [allApplication, setAllApplication] = React.useState([]);

  //Get all application info
  useEffect( () => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async() => {
    const data = await fetch('/apps'); //fetching data from port 5000 on proxy
    const apps = await data.json();

    const [app] = apps;
    
    var appsArray = apps.map(function(apps) {
      return apps['app_acronym'];
    });

    setApplication(`${JSON.stringify(app.app_acronym)}`);
    setAllApplication(appsArray);
  };

  const handleChange = (event) => {
    setApplication(event.target.value);
  };

  const handleAddApplications = () => {

  }

  const handleAddPlans = () => {

  }

  console.log("this " + application )

  return (
    <div title="Home" className="py-md-5">
      <div className="align-items-center">
        <p className="lead text-muted display-3-center">What's currently happening...</p>
        {/* <div className="col-lg-12 py-lg-3 center_align">
        <p className="display-3-center">Kanban board here</p>
        </div> */}
      </div>
      <div className="doFlex">
        {/* Application Panel */}
        <div className="col-lg-2 application-panel">
          {/* Create App */}
          <button type="button" className="btn btn-add btn-lg btn-block create-app" 
          data-bs-toggle="modal" data-bs-target="#createAppModal" onClick={handleAddApplications}>+</button>
          <CreateAppModal/>

          {/* Application selector */}
          <Box sx={{ minWidth: 120 }} className="py-md-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Applications</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // defaultValue={application}
                Value={application}
                label="Applications"
                onChange={handleChange}
              >
                {allApplication.map((apps) => {
                  console.log(JSON.stringify(apps))

                  return(
                  <MenuItem key={apps} value={JSON.stringify(apps)}>
                    <ListItemText primary={apps} />
                  </MenuItem>
                  )
                  })}

                {/* <MenuItem value={"test"}>Application 1</MenuItem>
                <MenuItem value={"test2"}>Application 2</MenuItem>
                <MenuItem value={"test3"}>Application 3</MenuItem> */}
              </Select>
            </FormControl>
          </Box>

          {/* Plans */}
          <h5 className="create-text">Current Plans:</h5>
          <button type="button" className="btn btn-add btn-lg btn-block create-app" 
          data-bs-toggle="modal" data-bs-target="#createPlanModal" onClick={handleAddPlans}>+</button>
          <CreatePlanModal/>

          <div className="py-lg-3 center_align text-align-center">
            <p className="app-items"><Link to="#">{" "}Plan 1{" "}</Link></p>
            <p className="app-items"><Link to="#">{" "}Plan 2{" "}</Link></p>
            <p className="app-items"><Link to="#">{" "}Plan 3{" "}</Link></p>
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