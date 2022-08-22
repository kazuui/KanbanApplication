import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import NavBar from './components/NavBar';
import Login from "./pages/Login/Login"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile"
import UserManagement from "./components/UserManagement"
import GroupManagement from "./components/GroupManagement"
import UpdateUser from "./components/updateUser"
import CreateUser from "./components/createUser"


function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/groups" element={<GroupManagement/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;