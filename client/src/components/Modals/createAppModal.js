import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

//Context
import BoardContext from "../../context/boardContext"

function Modal() {

  const { GroupsArray } = useContext(BoardContext);

  const [appAcronym, setAppAcronym] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [appRNum, setAppRNum] = useState("");
  const [appStartDate, setAppStartDate] = useState("");
  const [appEndDate, setAppEndDate] = useState("");
  const [permitCreate, setPermitCreate] = useState([]);
  const [permitOpen, setPermitOpen] = useState([]);
  const [permitToDo, setPermitToDo] = useState([]);
  const [permitDoing, setPermitDoing] = useState([]);
  const [permitDone, setPermitDone] = useState([]);

  //Multi-Selector
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

  //Submit Create Application
  async function handleCreateAppSubmit(e) {
    e.preventDefault();
    try{
      const response = await axios.post('/apps/create', {
        appAcronym,
        appDescription,
        appRNum,
        appStartDate,
        appEndDate,
        permitCreate,
        permitOpen,
        permitToDo,
        permitDoing,
        permitDone
      });
    } catch {

    }
  }

  // document.getElementById("app-Rnumber").addEventListener('input', e =>{
  //   e.target.value = Math.round(e.target.value.replace(/\D/g, ''))
  // });

  const [application, setApplication] = React.useState('');

  const handleAcronymChange = (event) => {
    setAppAcronym(event.target.value);
  };

  const handleAppDescriptionChange = (event) => {
    setAppDescription(event.target.value);
  };

  const handleRnumChange = (event) => {
    setAppRNum(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setAppStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setAppEndDate(event.target.value);
  };

  const handleCreateChange = (event) => {
    const {
      target: { value },
    } = event;

    setPermitCreate(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleOpenChange = (event) => {
    const {
      target: { value },
    } = event;

    setPermitOpen(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const handleToDoChange = (event) => {
    const {
      target: { value },
    } = event;

    setPermitToDo(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const handleDoingChange = (event) => {
    const {
      target: { value },
    } = event;

    setPermitDoing(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDoneChange = (event) => {
    const {
      target: { value },
    } = event;

    setPermitDone(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  return (
    // Testing
    <div className="modal fade" id="createAppModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Application</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleCreateAppSubmit}>
                <div className="form row">
                  {/* Left */}
                  <div className="col-6">
                    <div className="form-row py-lg-3">
                      <div className="col-6">
                        <label className="" for="app-acronym">Application Acronym</label>
                        <input required id="app-acronym" onChange={handleAcronymChange} type="text" className="form-control"/>
                      </div>
                      <div className="col-6">
                        <label className="" for="app-Rnumber">Running Number</label>
                        <input required id="app-Rnumber" onChange={handleRnumChange} type="number" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-row py-lg-2">
                      <div className="col-6">
                        <label className="" for="app-startDate">Start Date</label>
                        <input id="app-startDate" onChange={handleStartDateChange} type="date" className="form-control"/>
                      </div>
                      <div className="col-6">
                        <label className="" for="app-endDate">End Date</label>
                        <input id="app-endDate" onChange={handleEndDateChange} type="date" className="form-control"/>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="col-6 py-lg-3">
                    <div className="form-group">
                      <label for="app-description">Description</label>
                      <textarea onChange={handleAppDescriptionChange} className="form-control" id="app-description" rows="5"></textarea>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-4">
                    <FormControl>
                      <InputLabel id="demo-multiple-name-label">Create</InputLabel>
                      <Select 
                        className="select-form"
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={permitCreate}
                        onChange={handleCreateChange}
                        input={<OutlinedInput label="Create" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {GroupsArray.map((groups) => {
                          return(
                            <MenuItem key={groups} value={groups}>
                            <Checkbox checked={permitCreate.indexOf(groups) > -1} />
                            <ListItemText primary={groups} />
                            </MenuItem>
                          )
                        })}
                        </Select>
                    </FormControl>
                  </div>
                  <div className="col-4">
                    <FormControl>
                      <InputLabel id="demo-multiple-name-label">Open</InputLabel>
                      <Select 
                        className="select-form"
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={permitOpen}
                        onChange={handleOpenChange}
                        input={<OutlinedInput label="Open" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {GroupsArray.map((groups) => {
                          return(
                            <MenuItem key={groups} value={groups}>
                            <Checkbox checked={permitOpen.indexOf(groups) > -1} />
                            <ListItemText primary={groups} />
                            </MenuItem>
                          )
                        })}
                        </Select>
                    </FormControl>
                  </div>
                  <div className="col-4">
                    <FormControl>
                      <InputLabel id="demo-multiple-name-label">To-Do</InputLabel>
                      <Select 
                        className="select-form"
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={permitToDo}
                        onChange={handleToDoChange}
                        input={<OutlinedInput label="To-Do" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {GroupsArray.map((groups) => {
                          return(
                            <MenuItem key={groups} value={groups}>
                            <Checkbox checked={permitToDo.indexOf(groups) > -1} />
                            <ListItemText primary={groups} />
                            </MenuItem>
                          )
                        })}
                        </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="form-row py-md-4">
                  <div className="col-4">
                    <FormControl>
                      <InputLabel id="demo-multiple-name-label">Doing</InputLabel>
                      <Select 
                        className="select-form"
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={permitDoing}
                        onChange={handleDoingChange}
                        input={<OutlinedInput label="Doing" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {GroupsArray.map((groups) => {
                          return(
                            <MenuItem key={groups} value={groups}>
                            <Checkbox checked={permitDoing.indexOf(groups) > -1} />
                            <ListItemText primary={groups} />
                            </MenuItem>
                          )
                        })}
                        </Select>
                    </FormControl>
                  </div>
                  <div className="col-4">
                    <FormControl>
                      <InputLabel id="demo-multiple-name-label">Done</InputLabel>
                      <Select 
                        className="select-form"
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={permitDone}
                        onChange={handleDoneChange}
                        input={<OutlinedInput label="Done" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {GroupsArray.map((groups) => {
                          return(
                            <MenuItem key={groups} value={groups}>
                            <Checkbox checked={permitDone.indexOf(groups) > -1} />
                            <ListItemText primary={groups} />
                            </MenuItem>
                          )
                        })}
                        </Select>
                    </FormControl>
                  </div>
                </div>

              </form>
            </div>

            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Create</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Modal;