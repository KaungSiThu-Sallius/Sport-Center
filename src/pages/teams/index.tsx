import React, { useEffect } from "react";
import { useTeamsDispatch } from "../../context/teams/context";
import { fetchTeams } from "../../context/teams/actions";
import TeamLists from "./TeamLists";


const Teams = () => {
    const teamsDispatch = useTeamsDispatch();
    useEffect(() => {
        fetchTeams(teamsDispatch);
    }, []);

    return (
        <TeamLists />
    );
}

export default Teams;