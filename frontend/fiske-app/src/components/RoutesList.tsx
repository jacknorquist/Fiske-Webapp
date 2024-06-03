import {ReactNode} from 'react';
import React from 'react';
import { Route, RouteObject, Routes } from "react-router-dom";
import Group from './Group.tsx';


function RoutesList(){
    return (
        <Routes>
            <Route path="/profile" element={<Group />} />
            <Route path="/users" element={<Group />} />
            <Route path="/users/:username" element={<Group />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/groups/:id" element={<Group />} />
            <Route path="/groups/:id/:posts" element={<Group/>} />
            <Route path="/groups/:id/:posts/:id" element={<Group/>} />
            <Route path="/" element={<Group />} />
        </Routes>
    );
}


export default RoutesList;