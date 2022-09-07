import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Modal(props) {

  const { application, update } = props;

  //Toast
  const notify = (status) => {
    if(status === "success") {
      toast.success(`Plan successfully created [${application}]`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else if (status === "warning") {
      toast.warn('There was an error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else if (status === "plan exists") {
      toast.warn(`Plan already exists [${application}]`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  // const [application, setApplication] = React.useState('');
  const [planMVPName, setPlanMVPName] = useState("");
  const [planStartDate, setPlanStartDate] = useState("");
  const [planEndDate, setPlanEndDate] = useState("");

  //Submit Create Plan
  async function handleCreatePlanSubmit(e) {
    e.preventDefault();
    try{
      const response = await axios.post('/apps/plans/create', {
        application,
        planMVPName,
        planStartDate,
        planEndDate
      });

      if (response.data === "plan exists"){
        notify("plan exists");
      } else if (response.data === "success"){
        notify("success");
        document.getElementById("createAppForm").reset();
      }
    } catch {
      notify("warning");
      console.log("There was a problem.")
    }
    update();
  }

  const handlePlanMVPNameChange = (event) => {
    setPlanMVPName(event.target.value);
  };

  const handlePlanStartDateChange = (event) => {
    setPlanStartDate(event.target.value);
  };

  const handlePlanEndDateChange = (event) => {
    setPlanEndDate(event.target.value);
  };
  

  return (
    // Testing
    <div className="modal fade" id="createPlanModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Plan</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form id="createPlanForm" onSubmit={handleCreatePlanSubmit}>
                <div className="form row">
                  {/* Left */}
                  <div className="col-12">
                    <div className="form-row py-lg-3">
                      <div className="col-12">
                        <label className="" htmlFor="app-acronym">Plan MVP Name</label>
                        <input required id="app-acronym" onChange={handlePlanMVPNameChange} type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-row py-lg-2">
                      <div className="col-6">
                        <label className="" htmlFor="app-startDate">Start Date</label>
                        <input id="app-startDate" onChange={handlePlanStartDateChange} type="date" className="form-control"/>
                      </div>
                      <div className="col-6">
                        <label className="" htmlFor="app-endDate">End Date</label>
                        <input id="app-endDate" onChange={handlePlanEndDateChange} type="date" className="form-control"/>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" form="createPlanForm" className="btn btn-primary">Create</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Modal;