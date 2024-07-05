import React, {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.tsx";


function LoggedInProtection({children }):ReactNode {
    const {user} = useUser()
    console.log(user, 'user at logged in')
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children
  };

  export default LoggedInProtection