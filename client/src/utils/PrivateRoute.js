import { useContext } from "react";
import { Outlet , Navigate, useLocation } from "react-router"
import AuthContext from "../context/authContext"

const PrivateRoutes = ({ isAdmin }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  // let auth = {'token':false}

  

  return(
    // auth.token ? <Outlet/> : <Navigate to="/" />
    // <Outlet/>

    auth?.username
    ? <Outlet/> 
      : <Navigate to="/unauthorized" 
      />

    // auth?.isAdmin?.find(admin => isAdmin?.includes(true))
    //   ? <Outlet/> 
    //   : auth?.username
    //     ?<Navigate to="/unauthorized" // state={{ from: location }} replace
    //     />
    //     :<Navigate to="/unauthorized"/>
  )
}

export default PrivateRoutes