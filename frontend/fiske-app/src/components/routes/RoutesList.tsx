import {ReactNode} from 'react';
import React from 'react';
import { Route, RouteObject, Routes, Link } from "react-router-dom";
import Group from '../groups/Group.tsx';
import SignupContainer from '../signup/SignupContainer.tsx';

import LoginContainer from '../login/LoginContainer.tsx';
import LoggedOutProtection from './LoggedOutProtection.tsx'
import LoggedInProtection from './LoggedInProtection.tsx';
import ProfileContainer from '../profile/ProfileContainer.tsx';
import GroupsContainer from '../groups/GroupsContainer.tsx';
import GroupContainer from '../groups/GroupContainer.tsx';
import PostContainer from '../posts/PostContainer.tsx';
import Homepage from '../main/Homepage.tsx'
import LandingPage from '../main/LandingPage.tsx'
import NotFound from '../main/NotFound.tsx'


function RoutesList(){
    return (
        <Routes>
            <Route path="/landing" element={<LoggedInProtection><LandingPage /></LoggedInProtection>} />
            <Route path="/login" element={<LoggedInProtection><LoginContainer /></LoggedInProtection>} />
            <Route path="/signup" element={<LoggedInProtection><SignupContainer /></LoggedInProtection>} />
            <Route path="/profile/:id" element={<LoggedOutProtection><ProfileContainer /></LoggedOutProtection>}/>
            <Route path="/users" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/users/:username" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/groups" element={<LoggedOutProtection><GroupsContainer /></LoggedOutProtection>} />
            <Route path="/groups/:id" element={<LoggedOutProtection><GroupContainer /></LoggedOutProtection>} />
            <Route path="/groups/:id/:posts" element={<LoggedOutProtection><Group /></LoggedOutProtection>} />
            <Route path="/posts/:id" element={<LoggedOutProtection><PostContainer /></LoggedOutProtection>} />
            <Route path="/" element={<LoggedOutProtection><Homepage /></LoggedOutProtection>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}


export default RoutesList;