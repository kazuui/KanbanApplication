import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Context
import { AuthProvider } from "./context/authContext";
import { BoardProvider } from "./context/boardContext";

// Components
import NavBar from './components/NavBar';
import Login from "./pages/Login/Login"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
import UserManagement from "./components/UserManagement"
import GroupManagement from "./components/GroupManagement"
import UpdateUser from "./components/updateUser"
import CreateUser from "./components/createUser"
import ApplicationBoard from "./components/Board"


function App() {

  return (
    <AuthProvider>
    <BoardProvider>
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
        {/* <Route path="/app" element={<ApplicationBoard/>} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
    </BoardProvider>
    </AuthProvider>
  );
}

export default App;