import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function NavBar() {
  
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">{" "}Kanban App{" "}</Link>
        </h4>

        <div>
          <Link to="/profile" className="text-white navBarLink">{" "}Profile{" "}</Link>
          <Link to="/users" className="text-white navBarLink">{" "}User Management{" "}</Link>
          <Link to="/groups" className="text-white navBarLink">{" "}Group Management</Link>
          <Link to="/" className="text-white navBarLink">{" "}Logout</Link>
        </div>

      </div>
    </header>
  )
}

export default NavBar