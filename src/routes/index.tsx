import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
// import ProtectedRoute from "./ProtectedRoute";
import AccountLayout from "../layouts/account"
import Signin from "../pages/signin";
import Register from "../pages/register";
import Logout from "../pages/logout";
import Home from "../pages/home";
import ArticleDetailsContainer from "../pages/articles/ArticleDetailsContainer";


const router = createBrowserRouter([
    // { path: "/", element: <Navigate to="/account/projects" replace /> },


    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/logout",
        element: <Logout />
    },
    // Protected Routes
    {
        path: "/",
        element: (
            // <ProtectedRoute>
            <AccountLayout />
            // </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Home /> },
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "articles",
                        children: [
                            { index: true, element: <></> },
                            {
                                path: ":articleID",
                                element: <ArticleDetailsContainer />
                            },
                            {
                                path: ":sportID/:articleID",
                                element: <ArticleDetailsContainer />
                            }
                        ]
                    },
                ]
            },
            {
                path: ":sportID",
                element: <Home />,

            },

        ]
    },

    // {
    //     path: "*",
    //     element: <NotFound />
    // }
]);

export default router;