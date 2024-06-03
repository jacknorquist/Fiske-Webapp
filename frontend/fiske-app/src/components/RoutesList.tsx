import {ReactNode} from 'react';
import React from 'react';
import { Route, RouteObject, Routes } from "react-router-dom";
import Group from './Group.tsx'
import Post from './Post.tsx'
import LoginForm from './LoginForm.tsx';
import NotFound from './NotFound.tsx';


function RoutesList({login}){
    return (
        <Routes>
            <Route path="/login" element={<LoginForm login={login}/>} />
            <Route path="/profile" element={<Group />} />
            <Route path="/users" element={<Group />} />
            <Route path="/users/:username" element={<Group />} />
            <Route path="/groups" element={<Post />} />
            <Route path="/groups/:id" element={<Group />} />
            <Route path="/groups/:id/:posts" element={<Group/>} />
            <Route path="/groups/:id/:posts/:id" element={<Group/>} />
            <Route path="/" element={<Group />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}


export default RoutesList;