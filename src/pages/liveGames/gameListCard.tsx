import React, { useEffect, useState } from "react";
import { useMatchesState } from "../../context/matches/context";
import { useSportsState } from "../../context/sports/context";
import { API_ENDPOINT } from "../../config/constants";
import { useUserPreferencesState } from "../../context/userPreferences/context";

const MatchCard = () => {
    const token = localStorage.getItem("authToken") ?? "";
    const state = useMatchesState();
    const sportState = useSportsState();
    const { matchesDataList, isLoading, isError, errorMessage } = state;
    const sportDetailList = sportState;
    let sportData = sportDetailList.sportsDataList;

    const userpreferencesDataList = useUserPreferencesState();
    let userPreferenceData = userpreferencesDataList.userpreferencesDataList;
    let userPreferenceSports = userPreferenceData.sports;
    let userPreferenceTeams = userPreferenceData.teams;

    // console.log(sportData);

    const sportNames = userPreferenceSports.map(id => {
        const sport = sportData.find(sport => sport.id === id);
        return sport ? sport.name : null;
    });




    const [detailedMatches, setDetailedMatches] = useState([]);

    useEffect(() => {
        const fetchDetailedMatches = async () => {
            const detailedDataPromises = matchesDataList
                .filter((match) => match.isRunning)
                .slice(0, 5)
                .map((match) =>
                    fetch(`${API_ENDPOINT}/matches/${match.id}`)
                        .then((response) => response.json())
                );

            const detailedMatchesData = await Promise.all(detailedDataPromises);
            setDetailedMatches(detailedMatchesData);
        };

        fetchDetailedMatches();
    }, [matchesDataList]);

    // console.log(detailedMatches);


    let filterMatches = detailedMatches;

    if (token) {
        filterMatches = filterMatches.filter(match => {
            if (match.teams && match.teams.length > 0) {

                const hasMatchingTeam = match.teams.some(team => userPreferenceTeams.includes(team.id));
                return hasMatchingTeam;
            } else {

                return false;
            }
        });
        filterMatches = filterMatches.filter(sport => sportNames.includes(sport.sportName));
    }

    const refreshMatch = async (matchId) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`); // Replace with your API endpoint
            const refreshedMatch = await response.json();

            // Find the index of the refreshed match in the list
            const matchIndex = detailedMatches.findIndex(match => match.id === refreshedMatch.id);

            if (matchIndex !== -1) {
                // If the match is found, replace it with the refreshed match
                const updatedMatches = [...detailedMatches];
                updatedMatches[matchIndex] = refreshedMatch;

                // Update the component's state with the updated match list
                setDetailedMatches(updatedMatches);
                console.log("It is refreshed")
            }
        } catch (error) {
            console.error('Failed to refresh match:', error);
        }
    };


    if (isLoading) {
        return (
            <div className="p-4">
                Loading
            </div>
        );
    }

    // console.log(filterMatches);
    return (
        <>

            <div className="flex flex-wrap">
                {filterMatches.map((match, index) => (
                    <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-2">
                        <div className="flex">
                            <p className="text-sm grow">{match.sportName}</p>
                            <button className="flex-none refreshMatch" onClick={() => refreshMatch(match.id)}>
                                {/* "Refresh" button */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </button>
                        </div>
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                            {match.name}
                        </h5>

                        <p className="mb-3 font-normal text-gray-700">
                            {match.location}
                        </p>

                        <p className="font-normal text-gray-700">
                            {/* {Object.keys(match.score).map((team, i) => (
                                <>
                                    <span key={`${team}-${i}`}>
                                        {team}: {match.score[team]}

                                        <br />

                                    </span>

                                </>

                            ))} */}
                            {Object.keys(match.score).map((team) => (
                                <span key={`${team}-${match.id}`}>
                                    {team}: {match.score[team]}
                                    <br />
                                </span>
                            ))}

                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MatchCard;
