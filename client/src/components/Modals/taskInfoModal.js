import React, { useState, useEffect, useContext } from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Modal() {

  const [application, setApplication] = React.useState('');

  const handleChange = (event) => {
    setApplication(event.target.value);
  };

  return (
    // Testing
    <div className="modal fade" id="taskInfoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Task Info</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="form row">
                  {/* Left */}
                  <div className="col-6">
                    <div className="form-row py-lg-3">
                      <div className="col-12">
                        <label className="" for="app-acronym">Task Name</label>
                        <input id="app-acronym" type="text" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-row py-lg-2">
                      <div className="col-12">
                        <Box sx={{ minWidth: 120 }} className="py-md-2">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Add To Plan</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              defaultValue={10}
                              label="Add To Plan"
                              onChange={handleChange}>
                              <MenuItem value={10}>Application 1</MenuItem>
                              <MenuItem value={20}>Application 2</MenuItem>
                              <MenuItem value={30}>Application 3</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="col-6 py-lg-3">
                    <div className="form-group">
                      <label for="app-description">Task Description</label>
                      <textarea className="form-control" id="app-description" rows="5"></textarea>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-12">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Task Notes
                          </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body">
                            <textarea className="form-control" id="app-description" rows="5" defaultValue="Hello" disabled></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

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