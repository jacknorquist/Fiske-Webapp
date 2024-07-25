import React from "react";
import { ReactNode } from "react";


/**NotFound: rendered if url is not found
 *
 *Props:
 * - none
 *
 *State:
 * - none
 *
 * RoutesList -> NotFound
 */
function NotFound(): ReactNode {
    return (
        <div>
            <h1>NotFound</h1>
        </div>
    );
}

export default NotFound;