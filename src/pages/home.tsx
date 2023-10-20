import React from "react";
import Articles from "./articles";
import Matches from "./matches";
import Sports from "./sports";
import { Outlet } from "react-router-dom";

const Home = () => {

    return (
        <>
            <h1 className="text-2xl font-medium">Treading News</h1>
            <div className="flex">
                <div className="w-10/12 p-4">
                    <Articles />
                    <Outlet />
                </div>
                <div className="w-2/12 p-4">
                    <Sports />
                </div>
            </div>
        </>
    );
}

export default Home;