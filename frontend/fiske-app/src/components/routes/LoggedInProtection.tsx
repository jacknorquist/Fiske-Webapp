import React, {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.tsx";
import { UserType } from "../../types.ts";

/**LoggedInProtection: Navagites to '/' if user is logged in else renders children
 *
 *Props:
 * - children (ReactNode)
 *
 *State:
 * - none
 *
 * App -> RoutesList -> LoggedInProtection -> children
 */
function LoggedInProtection({children }:{children:ReactNode}):ReactNode {
    const {user}:{user:UserType} = useUser()
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children
  };

  export default LoggedInProtection