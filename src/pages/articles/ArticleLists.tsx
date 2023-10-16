/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useArticlesState } from "../../context/articles/context";
import React from "react";

export default function ArticleLists() {

    let state: any = useArticlesState();

    const { articlesDataList, isLoading, isError, errorMessage } = state


    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }
    console.log(articlesDataList);
    return (
        <>
            {articlesDataList.map((article: any) => (
                <div key={article.id}>
                    <h5 className="mb-2 text-xl font-medium">
                        {article.title}
                    </h5>
                </div>
            ))}
        </>
    );
}