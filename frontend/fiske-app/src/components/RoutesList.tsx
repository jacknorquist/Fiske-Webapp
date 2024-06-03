import {ReactNode} from 'react';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import App from '../App.tsx';



function RoutesList(){
    return (
        <div>
            <Route path="/profile" element={<App />} />
            <Route path="/users" element={<App />} />
            <Route path="/users/:username" element={<App />} />
            <Route path="/groups" element={<App />} />
            <Route path="/groups/:id" element={<App />} />
            <Route path="/groups/:id/:posts" element={<App/>} />
            <Route path="/groups/:id/:posts/:id" element={<App/>} />
            <Route path="/" element={<App />} />
        </div>
    );
}


export default RoutesList;