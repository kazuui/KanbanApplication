import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/authContext"

function NavBar() {

  const {doLogin, isLoggedIn, setLoggedIn} = useContext(AuthContext);

  const doLogout  = () => {
    setLoggedIn(false);
  }

  const navIcon = () => {
    if(isLoggedIn !== true){
      return(
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">{" "}Kanban App{" "}</Link>
        </h4>
      )
    } else {
      return(
        <h4 className="my-0 mr-md-auto font-weight-normal">
        <Link to="/home" className="text-white">{" "}Kanban App{" "}</Link>
      </h4>
      )
    }
  }

  const authLink = () =>{
    if(isLoggedIn !== true){
      return (
        <div>
          <Link to="/" className="text-white navBarLink">{" "}Login</Link>
        </div>
      )
    } else {
      return(
        <div>
          <Link to="/profile" className="text-white navBarLink">{" "}Profile{" "}</Link>
          <Link to="/users" className="text-white navBarLink">{" "}User Management{" "}</Link>
          <Link to="/groups" className="text-white navBarLink">{" "}Group Management</Link>
          <Link to="/" className="text-white navBarLink" onClick={doLogout}>{" "}Logout</Link>
        </div>
      )
    }
  }
  
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        {navIcon()}
        {/* <div>
          <Link to="/profile" className="text-white navBarLink">{" "}Profile{" "}</Link>
          <Link to="/users" className="text-white navBarLink">{" "}User Management{" "}</Link>
          <Link to="/groups" className="text-white navBarLink">{" "}Group Management</Link>
          <Link to="/" className="text-white navBarLink">{" "}Logout</Link>
        </div> */}
        {authLink()}

      </div>
    </header>
  )
}

export default NavBar