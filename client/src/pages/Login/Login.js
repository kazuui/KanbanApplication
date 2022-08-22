import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import axios from "axios";

function Login() {

  let Navigate = useNavigate();

  //Login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function doLogin(e) {
    e.preventDefault();
    try{
      const response = await axios.post('/login', {
        username,
        password
      })
      if (response.data){
        Navigate("/home", { replace: true });
      }
    } catch(e){
      console.log("There was a problem.")
    }
  };

  return (
    <Page title="Home">
      <div className="align-items-center">
        <h1 className="display-3 display-3-center center_align">Login</h1>
        <p className="lead text-muted display-3-center">To get your tasks sorted.</p>
        <div className="col-lg-7 py-lg-5 center_align">
          
          <form onSubmit={doLogin}>
            <div className="form-group">
              <input required id="username" name="username" className="form-control" type="text" autoComplete="off" placeholder="Username" onChange={(e) =>{ setUsername(e.target.value) }}/>
            </div>
            
            <div className="form-group">
              <input required id="password-login" name="password" className="form-control" type="password" placeholder="Password" onChange={(e) =>{
                setPassword(e.target.value) }}/>
            </div>
            
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block"> Login</button>

          </form>

        </div>
      </div>
    </Page>
  )
}

export default Login;