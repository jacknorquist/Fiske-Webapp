import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.tsx";

function LoggedOutProtection({ children }: { children: ReactNode }): ReactNode {
    const {user } = useUser();
    if (!user) {
      return <Navigate to="/landing" replace />;
    }
    return children;
}

export default LoggedOutProtection;