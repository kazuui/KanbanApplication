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

  const {currentAppID, setCurrentAppID, GroupsArray, setGroupsArray} = useContext(BoardContext);
  const [currentAppTasks, setCurrentAppTasks] = useState([]);
  const [currentAppPlans, setCurrentAppPlans] = useState([]);

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

  const [currApplication, setCurrApplication] = React.useState("");
  const [allApplication, setAllApplication] = React.useState([]);

  useEffect( () => {

    const fetchAll = async() => {
      //Get all apps
      const data = await fetch('/apps'); //fetching data from port 5000 on proxy
      const apps = await data.json();
      const [app] = apps;
      setCurrApplication(app.app_acronym);
  
      //Get current app data
      // const data1 = await fetch(`/apps/tasks/${app.app_acronym}`); //fetching data from port 5000 on proxy
      // const currAppData = await data1.json();
  
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
    };

    fetchAll();
  }, []);

  // Fetch current app task
  useEffect(() => {
    fetchCurrentAppTask();
    fetchCurrentAppPlan();
  }, [currApplication]);

  const updatePlans = async() => {
    fetchCurrentAppPlan();
  };

  const updateTasks = async() => {
    fetchCurrentAppTask();
  };

  const fetchCurrentAppTask = async() => {
    if(currApplication){
      const data = await fetch(`/apps/tasks/${currApplication}`); //fetching data from port 5000 on proxy
      setCurrentAppTasks(await data.json());
      // console.log(application, " " , currentAppTasks);
    }
  };

  const fetchCurrentAppPlan = async() => {
    if(currApplication){
      const data = await fetch(`/apps/plans/${currApplication}`); //fetching data from port 5000 on proxy
      setCurrentAppPlans(await data.json());
      // console.log(application, " " , currentAppPlans);
    }
  };

  const handleAppChange = (event) => {
    setCurrApplication(event.target.value);
    // console.log(event.target.value);
    // setCurrentAppID(event.target.value);
  };

  // const handleAddApplications = () => {
  // }

  // const handleAddPlans = () => {
  // }

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
          data-bs-toggle="modal" data-bs-target="#createAppModal">+</button>
          <CreateAppModal/>

          {/* Application selector */}
          <div className="py-md-3">
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">Current Application</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={currApplication}
                onChange={handleAppChange}
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
          data-bs-toggle="modal" data-bs-target="#createPlanModal">+</button>
          <CreatePlanModal application={currApplication} update={updatePlans}/>

          <div className="py-lg-3 center_align text-align-center">

          {currentAppPlans.map((plan) => {
            return(
              <p className="app-items"><Link to="#">{" "}{plan.plan_MVP_name}{" "}</Link></p>
            )
          })}
          </div>
        </div>
        <div className="col-lg-8 py-lg-4">
          <ApplicationBoard tasks={currentAppTasks} update={updateTasks} plans={currentAppPlans}/>
        </div>
      </div>
    </div>
  )
}

export default Home;