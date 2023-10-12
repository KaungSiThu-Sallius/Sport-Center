import React, { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import ArticleLists from "./ArticleLists";


const Articles = () => {
    const articlesDispatch = useArticlesDispatch();
    useEffect(() => {
        fetchArticles(articlesDispatch);
    }, []);

    return (
        <ArticleLists />
    );
}

export default Articles;