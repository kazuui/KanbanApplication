import React, { useState, useEffect, useContext } from "react";

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

  const { GroupsArray, currentApp, setCurrentApp } = useContext(BoardContext);

  // const [GroupsArray, setGroupsArray] = useState("");

  // useEffect( () => {
  //   fetchAllGroups();
  // }, []);

  // const fetchAllGroups = async() => {
  //    //Get all groups
  //   const data2 = await fetch('/groups'); //fetching data from port 5000 on proxy
  //   const groups = await data2.json();

  //   var groupArray = groups.map(function(group) {
  //     return group['group_name'];
  //   });
  //   setGroupsArray(groupArray);
  //   console.log(groupArray);
  // };

  const [permitCreate, setPermitCreate] = useState([]);
  const [permitOpen, setPermitOpen] = useState([]);
  const [permitToDo, setPermitToDo] = useState([]);
  const [permitDoing, setPermitDoing] = useState([]);
  const [permitDone, setPermitDone] = useState([]);

  // const names = [
  //   'Oliver Hansen',
  //   'Van Henry',
  //   'April Tucker',
  //   'Ralph Hubbard',
  //   'Omar Alexander',
  //   'Carlos Abbott',
  //   'Miriam Wagner',
  //   'Bradley Wilkerson',
  //   'Virginia Andrews',
  //   'Kelly Snyder',
  // ];

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

  const [application, setApplication] = React.useState('');

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
              <form>
                <div className="form row">
                  {/* Left */}
                  <div className="col-6">
                    <div className="form-row py-lg-3">
                      <div className="col-6">
                        <label className="" for="app-acronym">Application Acronym</label>
                        <input id="app-acronym" type="text" className="form-control"/>
                      </div>
                      <div className="col-6">
                        <label className="" for="app-Rnumber">Running Number</label>
                        <input id="app-Rnumber" type="number" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-row py-lg-2">
                      <div className="col-6">
                        <label className="" for="app-startDate">Start Date</label>
                        <input id="app-startDate" type="date" className="form-control"/>
                      </div>
                      <div className="col-6">
                        <label className="" for="app-endDate">End Date</label>
                        <input id="app-endDate" type="date" className="form-control"/>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="col-6 py-lg-3">
                    <div className="form-group">
                      <label for="app-description">Description</label>
                      <textarea className="form-control" id="app-description" rows="5"></textarea>
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