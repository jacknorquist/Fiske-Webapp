import React, {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.tsx";

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
function LoggedInProtection({children }):ReactNode {
    const {user} = useUser()
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children
  };

  export default LoggedInProtection