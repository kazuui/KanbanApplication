import { useContext } from "react";
import { Outlet , Navigate, useLocation } from "react-router"
import AuthContext from "../context/authContext"

const PrivateRoutes = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  // let auth = {'token':false}

  var user = sessionStorage.getItem("user");
  user = JSON.parse(user);
  console.log(user?.role)
  return(     
    allowedRoles.includes(user?.role)
    // user?.role?.find(role => allowedRoles?.includes(role))
      ? <Outlet/>
      : user?.username
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/" state={{ from: location }} replace />

    //////////////// UNUSED ////////////////////////////
    // user.role.find(role => allowedRoles.include(role))
    //   ? <Outlet/>
    //   : user.username
    //   ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //   : <Navigate to="/" state={{ from: location }} replace />

    // auth?.username
    // ? <Outlet/> 
    //   : <Navigate to="/unauthorized" 
    //   />

    // auth?.isAdmin?.find(admin => isAdmin?.includes(true))
    //   ? <Outlet/> 
    //   : auth?.username
    //     ?<Navigate to="/unauthorized" // state={{ from: location }} replace
    //     />
    //     :<Navigate to="/unauthorized"/>
  )
}

export default PrivateRoutes