import { createContext, useState , useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

//Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export default AuthContext;

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
    }
  }

//   let Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Login form 
  async function doLogin(username, password) {

    try{
    const response = await axios.post('/login', {
        username,
        password
    })

    console.log(response.data);

    if(response.data == "Wrong password/username"){
      notify("warning");
    } else if (response.data.accessToken){
      var decoded = await jwt_decode(response.data.accessToken);
      // console.log(decoded);
      setIsLoggedIn(true);
      return(decoded);
    }

    } catch(e){
    console.log("There was a problem.")
    }
};

  return(
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, doLogin }}>
        {children}
    </AuthContext.Provider>
  )
}