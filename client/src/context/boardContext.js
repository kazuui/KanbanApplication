import { createContext, useState , useEffect } from "react";

const BoardContext = createContext();

export default BoardContext;

export const BoardProvider = ({ children, ...rest }) => {

  const [GroupsArray, setGroupsArray] = useState([]);

  //Permit access rights
  const [userAccess, setUserAccess] = useState("");

  //Current Application
  const [currentApp, setCurrentApp] = useState("");

  return(
    <BoardContext.Provider value={{ GroupsArray , setGroupsArray , currentApp , setCurrentApp }}>
        {children}
    </BoardContext.Provider>
  )
}