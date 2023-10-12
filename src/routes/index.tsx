import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import Articles from '../pages/articles/index';
// import ProtectedRoute from "./ProtectedRoute";
import AccountLayout from "../layouts/account"

const router = createBrowserRouter([
    // { path: "/", element: <Navigate to="/account/projects" replace /> },
    // {
    //     path: "/signin",
    //     element: <Signin />
    // },
    // {
    //     path: "/signup",
    //     element: <Signup />
    // },
    // {
    //     path: "/logout",
    //     element: <Logout />
    // },
    // Protected Routes
    {
        path: "/",
        element: (
            //<ProtectedRoute>
            <AccountLayout />
            //</ProtectedRoute>
        ),
        children: [
            { index: true, element: <Articles /> },

        ]
    },

    // {
    //     path: "*",
    //     element: <NotFound />
    // }
]);

export default router;