import { createContext, useState , useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

//Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

// export default AuthContext;

export const AuthProvider = ({ children, ...rest }) => {

  //Toast
  const notify = (status) => {
    if (status === "warning") {
      toast.warn('Wrong username/password', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else if (status === "deactivated") {
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

  //Check admin
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [auth, setAuth] = useState({});
  const [thisUserID, setThisUserID] = useState("");
  const [userInfo, setUserInfo] = useState("");

  //Login form 
  async function doLogin(username, password) {

    try{
    const response = await axios.post('/login', {
        username,
        password
    })

    if(response.data === "Wrong password/username"){
      notify("warning");
    } else if (response.data === "deactivated"){
      notify("deactivated");
    }else if (response.data.token){
      setIsLoggedIn(true);

      const role = response.data.role;
      const token = response.data.token;
      // sessionStorage.setItem("username", username);
      // sessionStorage.setItem("token", token);
      // sessionStorage.setItem("role", role);
      sessionStorage.setItem('user', JSON.stringify({
        username,
        token,
        role
      }))

      setUserRole(role);

      setAuth({username : username , role: role , token : token});
      // setIsLoggedIn(true);
      setUserInfo(response.data);
      setThisUserID(response.data.user_id);
      return(true);
    }

    } catch(e){
    console.log("There was a problem.")
    }
};

  return(
    <AuthContext.Provider value={{ doLogin , auth , setAuth , thisUserID, setThisUserID , userRole, isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;