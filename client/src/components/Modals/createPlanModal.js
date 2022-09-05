import React, { useState, useEffect, useContext } from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Modal() {

  const [application, setApplication] = React.useState('');
  const [planMVPName, setPlanMVPName] = useState("");
  const [planStartDate, setPlanStartDate] = useState("");
  const [planEndDate, setPlanEndDate] = useState("");

  //Submit Create Plan
  async function handleCreatePlanSubmit(e) {

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
                        <label className="" for="app-acronym">Plan MVP Name</label>
                        <input required id="app-acronym" onChange={handlePlanMVPNameChange} type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-row py-lg-2">
                      <div className="col-6">
                        <label className="" for="app-startDate">Start Date</label>
                        <input id="app-startDate" onChange={handlePlanStartDateChange} type="date" className="form-control"/>
                      </div>
                      <div className="col-6">
                        <label className="" for="app-endDate">End Date</label>
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