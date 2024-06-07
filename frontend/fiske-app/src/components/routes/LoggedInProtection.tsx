import React, {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.tsx";


function LoggedInProtection({children }):ReactNode {
    const {user} = useUser()
    if (user) {
      return <Navigate to="/" replace />;
    }
    console.log(children, 'loggedin')
    return children
  };

  export default LoggedInProtection