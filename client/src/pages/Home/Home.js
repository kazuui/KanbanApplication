import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import Page from '../../components/Page';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Context
import BoardContext from "../../context/boardContext"

//Components
import ApplicationBoard from "../../components/Board"
import CreateAppModal from "../../components/Modals/createAppModal"
import CreatePlanModal from "../../components/Modals/createPlanModal"

function Home() {
  document.title = `Home | Task Management App`;

  const {currentAppID, setCurrentAppID} = useContext(BoardContext);
  const {GroupsArray, setGroupsArray} = useContext(BoardContext);

  //Application selector
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [application, setApplication] = React.useState('');
  const [allApplication, setAllApplication] = React.useState([]);

  useEffect( () => {
    fetchAll();
  }, []);

  const fetchAll = async() => {
    //Get all apps
    const data = await fetch('/apps'); //fetching data from port 5000 on proxy
    const apps = await data.json();
    const [app] = apps;
    setApplication(app.app_acronym);

    //Get current app data
    const data1 = await fetch(`/apps/tasks/${app.app_acronym}`); //fetching data from port 5000 on proxy
    const currAppData = await data1.json();

    var appsArray = apps.map(function(apps) {
      return apps['app_acronym'];
    });
    setAllApplication(appsArray);

     //Get all groups
    const data2 = await fetch('/groups'); //fetching data from port 5000 on proxy
    const groups = await data2.json();

    var groupArray = groups.map(function(group) {
      return group['group_name'];
    });
    setGroupsArray(groupArray);
    console.log(currAppData);
    console.log(groupArray);
  };

  const fetchCurrentAppTask = async() => {
    const data = await fetch(`/apps/tasks/${application}`); //fetching data from port 5000 on proxy
    const currentAppTasks = await data.json();

    console.log(currentAppTasks);
  };

  const handleChange = (event) => {
    setApplication(event.target.value);
  };

  const handleAddApplications = () => {

  }

  const handleAddPlans = () => {

  }

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
          <div className="py-md-3">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">Current Application</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={application}
                onChange={handleChange}
                input={<OutlinedInput label="Current Application" />}
                MenuProps={MenuProps}
              >
                {allApplication.map((app) => (
                  <MenuItem key={app} value={app}>
                    {app}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

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