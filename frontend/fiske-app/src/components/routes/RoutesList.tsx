import {ReactNode} from 'react';
import React from 'react';
import { Route, RouteObject, Routes } from "react-router-dom";
import Group from '../Group.tsx'
import Post from '../Post.tsx'
import SignupContainer from '../signup/SignupContainer.tsx';
import NotFound from '../NotFound.tsx';
import LoginContainer from '../login/LoginContainer.tsx';
import LoggedOutProtection from './LoggedOutProtection.tsx'
import LoggedInProtection from './LoggedInProtection.tsx';
import Homepage from '../Homepage.tsx';
import LandingPage from '../LandingPage.tsx';
import ProfileContainer from '../profile/ProfileContainer.tsx';


function RoutesList(){
    return (
        <Routes>
            <Route path="/landing" element={<LoggedInProtection><LandingPage /></LoggedInProtection>} />
            <Route path="/login" element={<LoggedInProtection><LoginContainer /></LoggedInProtection>} />
            <Route path="/signup" element={<LoggedInProtection><SignupContainer /></LoggedInProtection>} />
            <Route path="/profile" element={<LoggedOutProtection><ProfileContainer /></LoggedOutProtection>}/>
            <Route path="/users" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/users/:username" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/groups" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/groups/:id" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/groups/:id/:posts" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/groups/:id/:posts/:id" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/" element={<LoggedOutProtection><Homepage /></LoggedOutProtection>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}


export default RoutesList;