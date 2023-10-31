import React, { useEffect } from "react";
import MatchCard from './gameListCard';
import { useMatchesDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/actions";

const LiveGames: React.FC = () => {
    const matchesDispatch = useMatchesDispatch();
    useEffect(() => {
        fetchMatches(matchesDispatch);
    }, []);
    return (
        <>
            <h1 className="text-2xl font-medium mb-5 px-4">Live Games</h1>
            <MatchCard />
        </>
    );
}

export default LiveGames;
