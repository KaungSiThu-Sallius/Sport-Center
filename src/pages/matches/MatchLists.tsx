/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMatchesState } from "../../context/matches/context";
import React from "react";

export default function MatchLists() {
    let state: any = useMatchesState();
    const { matchesDataList, isLoading, isError, errorMessage } = state

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }

    console.log(matchesDataList);
    return (
        <div>
            <h1>Matches</h1>
            {matchesDataList.map((match: any) => (
                <div key={match.id}>
                    <h5 className="mb-2 text-xl font-medium">
                        {match.name}
                    </h5>
                </div>
            ))}
        </div>
    );
}
