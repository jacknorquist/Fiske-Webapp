import React, { ReactNode } from "react";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { Navigate } from "react-router-dom";

function LoggedOutProtection({ children }: { children: ReactNode }): ReactNode {
    const { loggedIn } = useLoggedIn();
    console.log(children, 'loggedout', loggedIn)
    if (loggedIn !== false) {
      return <Navigate to="/landing" replace />;
    }
    return children;
}

export default LoggedOutProtection;