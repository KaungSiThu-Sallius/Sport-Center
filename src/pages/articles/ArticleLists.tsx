/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useArticlesState } from "../../context/articles/context";

export default function ArticleLists() {

    let state: any = useArticlesState();

    const { articles, isLoading, isError, errorMessage } = state
    console.log(articles);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }

    return (
        <>
            <h1>OK</h1>
        </>
    );
}