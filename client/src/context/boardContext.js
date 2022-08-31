import { createContext, useState , useEffect } from "react";

const BoardContext = createContext();

export default BoardContext;

export const BoardProvider = ({ children, ...rest }) => {
  
  //Current Application
  const [currentAppID, setCurrentAppID] = useState("");

  return(
    <BoardContext.Provider value={{ currentAppID, setCurrentAppID }}>
        {children}
    </BoardContext.Provider>
  )
}