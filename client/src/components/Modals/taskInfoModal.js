import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskInfoModal(props) {

   //Toast
   const notify = (status, taskName) => {
    if(status === "success") {
      toast.success(`"${taskName}" ${taskAction}d`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else if (status === "warning") {
      toast.warn('Something went wrong', {
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

  const { showModal, handleCloseModal , taskInfo, taskAction, updateTask, plans, openRights } = props;

  const [application, setApplication] = React.useState('');
  const [taskDescription, setTaskDescription] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [addToPlan, setAddToPlan] = useState([]);

   //Plan selector
   const ITEM_HEIGHT = 48;
   const ITEM_PADDING_TOP = 8;
   const MenuProps = {
     PaperProps: {
       style: {
         maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
         width: 250,
       },
     },
   };

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleNotesChange = (event) => {
    setTaskNote(event.target.value)
  };

  const handlePlanChange = (event) => {
    setAddToPlan(event.target.value);
  };


  const handleMoveTask = async (event) => {

    let username = await (JSON.parse(sessionStorage.getItem('user'))).username;
    let application = taskInfo.task_app_acronym
    let taskID = taskInfo.task_id
    let updateType = taskAction
    let taskName = taskInfo.task_name
    let currentState = taskInfo.task_state
    let taskCreator = taskInfo.task_creator

    const response = await axios.post('/apps/tasks/move', {
      username,
      application,
      updateType,
      currentState,
      taskID,
      taskName,
      addToPlan,
      taskDescription,
      taskNote
    })
    
    // .then(updateTask === "promote" && currentState ==="doing"
    //   ? await axios.post('/task/send-email', {
    //     application,
    //     username,
    //     taskCreator,
    //     taskName,
    //     taskNote
    //   })
    //   : ""
    // );

    if (response.data === "success"){
      notify("success", taskName);
      updateTask()
      handleCloseModal()
      reloadForm()

      if (updateType === "promote" && currentState === "doing"){
        const sendEmail = await axios.post('/task/send-email', {
          application,
          username,
          taskCreator,
          taskName,
          taskNote
        })
        console.log(sendEmail.data);
      }

    } else {
      notify("warning", taskName);
    }

    // setApplication(event.target.value);
  };

  const handleUpdateTaskInfo = async (event) => {
    let username = await (JSON.parse(sessionStorage.getItem('user'))).username;
    let application = taskInfo.task_app_acronym
    let taskID = taskInfo.task_id
    let taskName = taskInfo.task_name
    let currentState = taskInfo.task_state

    const response = await axios.post('/apps/tasks/update', {
      username,
      application,
      currentState,
      taskID,
      taskName,
      addToPlan,
      taskDescription
    });

    console.log(response.data)

    if(response.data === "no changes"){

    } else if (response.data === "success"){
      updateTask()
      handleCloseModal()
      reloadForm()
    }
  };

   //reload form
   async function reloadForm() {
    document.getElementById("updateForm").reset();
    document.getElementById("app-notes").focus();
    setTaskDescription("");
    setTaskNote("");
  }

  return (
    <Modal size="lg" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {taskAction === "promote"
              ? "Promote Task"
              : taskAction === "demote"
                ? "Demote Task"
                : "Task Information"
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="updateForm">
            <div className="form row  py-lg-2">
              {/* Left */}
              <div className="col-6">
                <div className="form-row">
                  <div className="col-12">
                    <label className="" htmlFor="task-name">Task Name</label>
                    <input disabled id="task-name" type="text" value={taskInfo.task_name} className="form-control"/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 py-lg-2">
                    <label className="" htmlFor="task-id">Task ID</label>
                    <input disabled id="task-id" type="text" value={taskInfo.task_id} className="form-control"/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 py-lg-3">
                    {/* <label className="" htmlFor="task-plan-name">Plan</label>
                    <input disabled={taskInfo.task_state === "open"? "" : true} id="task-plan-name" type="text" value={taskInfo.task_plan} className="form-control"/> */}
                    <FormControl fullWidth 
                    disabled={
                      !openRights
                        ? true
                        : taskInfo.task_state === "open"
                          ?false
                          :true
                    }>
                      <InputLabel id="demo-multiple-name-label">Add to Plan</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={addToPlan.length !== 0 ? addToPlan :"none"}
                        onChange={handlePlanChange}
                        input={<OutlinedInput label="Add to Plan" />}
                        MenuProps={MenuProps}
                      >
                        <MenuItem key={"none"} value={"none"}>None</MenuItem>
                        {plans.map((plan) => (
                          <MenuItem key={plan.plan_MVP_name} value={plan.plan_MVP_name}>
                            {plan.plan_MVP_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              
              {/* Right */}
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="task-description">Task Description</label>
                  <textarea className="form-control task-description" id="task-description" rows="8" 
                  defaultValue={taskInfo.task_description? taskInfo.task_description : "None"}
                  onChange={handleDescriptionChange}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              {taskAction
              ?<div className="col-12">
                  <label htmlFor="app-notes">Notes</label>
                  <textarea autoFocus className="form-control" id="app-notes" rows="4"
                  onChange={handleNotesChange}
                  ></textarea>
                </div>
              : null
              }
              <div className="col-12 py-lg-3">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Task Notes
                      </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body">
                        <textarea disabled className="form-control" id="app-description" rows="8" defaultValue={taskInfo.task_notes}></textarea>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" 
          onClick={taskAction
            ? handleMoveTask
            : handleUpdateTaskInfo
          }>
            {taskAction === "promote"
            ? "Promote Task"
            : taskAction === "demote"
              ? "Demote Task"
              : "Save Changes"
          }
          </Button>
        </Modal.Footer>
      </Modal>

    // Testing
    // <div className="modal fade" id="taskInfoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div className="modal-dialog modal-lg">
    //     <div className="modal-content">
    //         <div className="modal-header">
    //         <h5 className="modal-title" id="exampleModalLabel">Task Info</h5>
    //         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>

    //         <div className="modal-body">
    //           <form>
    //             <div className="form row">
    //               {/* Left */}
    //               <div className="col-6">
    //                 <div className="form-row py-lg-3">
    //                   <div className="col-12">
    //                     <label className="" htmlFor="task-name">Task Name</label>
    //                     <input id="task-name" type="text" className="form-control"/>
    //                   </div>
    //                 </div>
    //                 <div className="form-row py-lg-2">
    //                   <div className="col-12">
    //                     <Box sx={{ minWidth: 120 }} className="py-md-2">
    //                       <FormControl fullWidth>
    //                         <InputLabel id="demo-simple-select-label">Add To Plan</InputLabel>
    //                         <Select
    //                           labelId="demo-simple-select-label"
    //                           id="demo-simple-select"
    //                           defaultValue={10}
    //                           label="Add To Plan"
    //                           onChange={handleChange}>
    //                           <MenuItem value={10}>Application 1</MenuItem>
    //                           <MenuItem value={20}>Application 2</MenuItem>
    //                           <MenuItem value={30}>Application 3</MenuItem>
    //                         </Select>
    //                       </FormControl>
    //                     </Box>
    //                   </div>
    //                 </div>
    //               </div>

    //               {/* Right */}
    //               <div className="col-6 py-lg-3">
    //                 <div className="form-group">
    //                   <label htmlFor="app-description">Task Description</label>
    //                   <textarea className="form-control" id="app-description" rows="5"></textarea>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="form-row">
    //               <div className="col-12">
    //                 <div className="accordion accordion-flush" id="accordionFlushExample">
    //                   <div className="accordion-item">
    //                     <h2 className="accordion-header" id="flush-headingOne">
    //                       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
    //                         Task Notes
    //                       </button>
    //                     </h2>
    //                     <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
    //                       <div className="accordion-body">
    //                         <textarea className="form-control" id="app-description" rows="5" defaultValue="Hello" disabled></textarea>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>

    //               </div>
    //             </div>

    //           </form>
    //         </div>

    //         <div className="modal-footer">
    //         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //         {/* <button type="button" className="btn btn-primary">Create</button> */}
    //         </div>
    //     </div>
    //     </div>
    // </div>
  )
}

export default TaskInfoModal;