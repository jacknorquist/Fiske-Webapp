import React, {ReactNode} from "react";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { Navigate } from "react-router-dom";


function LoggedInProtection({children }):ReactNode {
    const loggedIn = useLoggedIn()
    if (loggedIn.loggedIn) {
      return <Navigate to="/" replace />;
    }
    return children
  };

  export default LoggedInProtection