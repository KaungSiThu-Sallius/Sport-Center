import React, { useEffect } from "react";
import Articles from "./articles";
import LiveGames from "./liveGames";
import Teams from "./teams";
import { Outlet } from "react-router-dom";
import { useUserPreferencesDispatch } from "../context/userPreferences/context";
import { fetchUserPreferences } from "../context/userPreferences/actions";
import { useUserPreferencesState } from "../context/userPreferences/context";
import Favourite from "./favourites";


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

                <div className="w-9/12 p-4">

                    <Articles />
                    <Outlet />
                </div>
                <div className="w-3/12 p-4">
                    <Favourite />
                </div>
            </div>
        </>
    );
}

export default Home;