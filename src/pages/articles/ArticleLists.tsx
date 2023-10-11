/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useArticlesState } from "../../context/articles/context";

export default function ArticleLists() {

    let state: any = useArticlesState();

    const { ArticleData, isLoading, isError, errorMessage } = state

    console.log(ArticleData);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }



    return (
        <>
            {ArticleData.map((article: any) => (
                <div key={article.id}>
                    <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                        {article.title}
                    </h5>
                </div>
            ))}
        </>
    );
}