import React, {ReactNode} from "react";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { Navigate } from "react-router-dom";


function LoggedInProtection({children }):ReactNode {
    const {loggedIn} = useLoggedIn()
    if (loggedIn) {
      return <Navigate to="/" replace />;
    }
    console.log(children, 'loggedin')
    return children
  };

  export default LoggedInProtection