import { createContext, useState , useEffect , useContext } from "react";

//Context
import AuthContext from "./authContext"

const ApplicationContext = createContext();

export default ApplicationContext;

export const ApplicationProvider = ({ children, ...rest }) => {

  const { thisUsername , isLoggedIn } = useContext(AuthContext);
  const [GroupsArray, setGroupsArray] = useState([]);
  //Current Application
  const [currApplication, setCurrApplication] = useState("");

  // useEffect(() => {
  //   var user = sessionStorage.getItem("user");
  //   user = JSON.parse(user);
  //   setUserData(user);
  // }, [isLoggedIn])

  return(
    <ApplicationContext.Provider value={{ GroupsArray , setGroupsArray , currApplication, setCurrApplication }}>
        {children}
    </ApplicationContext.Provider>
  )
}