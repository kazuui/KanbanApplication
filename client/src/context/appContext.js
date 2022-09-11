import React,  { createContext, useState , useEffect , useContext } from "react";

//Context
// import AuthContext from "./authContext"

const ApplicationContext = createContext();

export default ApplicationContext;

export const ApplicationProvider = ({ children, ...rest }) => {

  const [GroupsArray, setGroupsArray] = useState([]);
  const [currApplication, setCurrApplication] = useState("");

  return(
    <ApplicationContext.Provider value={{ GroupsArray , setGroupsArray , currApplication, setCurrApplication }}>
        {children}
    </ApplicationContext.Provider>
  )
}