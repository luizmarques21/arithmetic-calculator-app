import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../pages/Login";
import Header from "../components/Header";
import PrivateRoute from "./private";
import Operation from "../pages/Operation";
import Records from "../pages/Record";

const routes = () => (
    <BrowserRouter>
        <Header />
        <ToastContainer 
            position="top-right" 
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
        <Routes>
            <Route exact path="" element={<Login />} />
            <Route 
                exact 
                path="/operation" 
                element={
                    <PrivateRoute redirectTo="">
                        <Operation />
                    </PrivateRoute>
                } 
            />
            <Route 
                exact 
                path="/records" 
                element={
                    <PrivateRoute redirectTo="">
                        <Records />
                    </PrivateRoute>
                } 
            />
        </Routes>
    </BrowserRouter>
);

export default routes;