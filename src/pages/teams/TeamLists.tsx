/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTeamsState } from "../../context/teams/context";
import React, { useState } from "react";

export default function TeamLists() {
    const [selectedTeams, setSelectedTeams] = useState([]);
    let state: any = useTeamsState();
    const handleTeamChange = (team) => {
        if (selectedTeams.includes(team)) {
            setSelectedTeams(selectedTeams.filter((item) => item !== team));
        } else {
            setSelectedTeams([...selectedTeams, team]);
        }
    };

    const { teamsDataList, isLoading, isError, errorMessage } = state


    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }
    return (
        <>

            {teamsDataList.map((team: any) => (
                <div key={team.id}>
                    <h5 className="mb-2 text-xl font-medium">
                        {team.name}
                    </h5>
                </div>
            ))}
        </>
    );
}