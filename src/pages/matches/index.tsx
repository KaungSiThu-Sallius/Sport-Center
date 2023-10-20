import React, { useEffect } from "react";
import { useMatchesDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/actions";
import MatchLists from "./MatchLists";


const Matches = () => {
    const matchesDispatch = useMatchesDispatch();
    useEffect(() => {
        fetchMatches(matchesDispatch);
    }, []);

    return (
        <MatchLists />
    );
}

export default Matches;