import React, { useEffect } from "react";
import Articles from "./articles";
import LiveGames from "./liveGames";
import Teams from "./teams";
import { Outlet } from "react-router-dom";
import { useUserPreferencesDispatch } from "../context/userPreferences/context";
import { fetchUserPreferences } from "../context/userPreferences/actions";
import { useUserPreferencesState } from "../context/userPreferences/context";


const Home = () => {
    const userPreferenceDispatch = useUserPreferencesDispatch();
    let userPreferenceState: any = useUserPreferencesState();
    const { userpreferencesDataList, isUserPreferenceLoading, isUserPreferenceError, errorUserPreferenceMessage } = userPreferenceState
    useEffect(() => {
        fetchUserPreferences(userPreferenceDispatch);
    }, [userpreferencesDataList]);


    return (
        <>
            <div className="flex">
                <div className="">
                    <LiveGames />
                </div>

            </div>
            <div className="flex">

                <div className="w-10/12 p-4">

                    <Articles />
                    <Outlet />
                </div>
                <div className="w-2/12 p-4">
                    <Teams />
                </div>
            </div>
        </>
    );
}

export default Home;