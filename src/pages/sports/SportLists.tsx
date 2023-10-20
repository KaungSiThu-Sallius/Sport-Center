/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSportsState } from "../../context/sports/context";
import React from "react";

export default function SportLists() {

    let state: any = useSportsState();

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