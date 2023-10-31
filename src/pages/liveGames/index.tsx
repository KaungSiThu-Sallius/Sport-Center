import React, { useEffect } from "react";
import MatchCard from './gameListCard';
import { useMatchesDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/actions";


const LiveGames: React.FC = () => {
    const matchesDispatch = useMatchesDispatch();
    const sportsDispatch = useSportsDispatch();;
    useEffect(() => {
        fetchMatches(matchesDispatch);
        fetchSports(sportsDispatch)
    }, []);
    return (
        <>
            <h1 className="text-2xl font-medium mb-5 px-4">Live Games</h1>
            <MatchCard />
        </>
    );
}

export default LiveGames;
