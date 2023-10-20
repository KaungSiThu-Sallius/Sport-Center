import React, { useEffect } from "react";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/actions";
import SportLists from "./SportLists";


const Sports = () => {
    const sportsDispatch = useSportsDispatch();
    useEffect(() => {
        fetchSports(sportsDispatch);
    }, []);

    return (
        <SportLists />
    );
}

export default Sports;