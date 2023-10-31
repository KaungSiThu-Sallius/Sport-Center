import React, { useEffect, useState } from "react";
import { useMatchesState } from "../../context/matches/context";
import { API_ENDPOINT } from "../../config/constants";

const MatchCard = () => {
    const state = useMatchesState();
    const { matchesDataList, isLoading, isError, errorMessage } = state;
    const [detailedMatches, setDetailedMatches] = useState([]);

    useEffect(() => {
        const fetchDetailedMatches = async () => {
            const detailedDataPromises = matchesDataList
                .filter((match) => match.isRunning)
                .slice(0, 3)
                .map((match) =>
                    fetch(`${API_ENDPOINT}/matches/${match.id}`)
                        .then((response) => response.json())
                );

            const detailedMatchesData = await Promise.all(detailedDataPromises);
            setDetailedMatches(detailedMatchesData);
        };

        fetchDetailedMatches();
    }, [matchesDataList]);

    if (isLoading) {
        return (
            <div className="p-4">
                Loading
            </div>
        );
    }

    return (
        <>

            <div className="flex flex-wrap">
                {detailedMatches.map((match, index) => (
                    <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow m-2">
                        <div className="flex">
                            <p className="text-sm grow">{match.sportName}</p>
                            <a href="" className="flex-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </a>
                        </div>
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                            {match.name}
                        </h5>

                        <p className="mb-3 font-normal text-gray-700">
                            {match.location}
                        </p>

                        <p className="font-normal text-gray-700">
                            {Object.keys(match.id).map((team, i) => (
                                <>
                                    <span key={i}>
                                        {team}: {match.score[team]}
                                    </span>
                                    <br />
                                </>

                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MatchCard;
