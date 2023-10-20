import React from "react";
import { useArticlesState } from "../../context/articles/context";
import ArticleDetails from "./ArticleDetails";
import { useParams, Outlet } from "react-router-dom";


const ArticleDetailsContainer = () => {
    // eslint-disable-next-line prefer-const
    let { articleID } = useParams();
    const articleState = useArticlesState();
    const isFetchingArticles = articleState.isLoading;
    const selectedArticle = articleState.articlesDataList?.[articleID || ""];
    if (isFetchingArticles || !articleState || articleState?.isLoading) {
        return <>Loading...</>;
    }
    if (!selectedArticle) {
        return <>No such Article!</>;
    }

    return (
        <>
            <ArticleDetails />
            <Outlet />
        </>
    )


};

export default ArticleDetailsContainer;