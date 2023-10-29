/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSportsState } from "../../context/sports/context";
import React, { useState } from "react";

export default function SportLists() {
    const [selectedSports, setSelectedSports] = useState([]);
    let state: any = useSportsState();
    const handleSportChange = (sport) => {
        if (selectedSports.includes(sport)) {
            setSelectedSports(selectedSports.filter((item) => item !== sport));
        } else {
            setSelectedSports([...selectedSports, sport]);
        }
    };

    const { sportsDataList, isLoading, isError, errorMessage } = state


    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }
    return (
        <>

            {sportsDataList.map((sport: any) => (
                <div key={sport.id}>
                    <h5 className="mb-2 text-xl font-medium">
                        {sport.name}
                    </h5>
                </div>
            ))}
        </>
    );
}