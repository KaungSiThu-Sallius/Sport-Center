import React, { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/actions";


import ArticleLists from "./ArticleLists";
import { useLocation, useParams } from "react-router-dom";
import ArticleSubMenu from "./ArticleSubMenu";




const Articles = () => {

    let { sportID } = useParams();

    const articlesDispatch = useArticlesDispatch();
    const sportsDispatch = useSportsDispatch();


    useEffect(() => {
        fetchArticles(articlesDispatch);
        fetchSports(sportsDispatch);

    }, []);



    return (
        <>
            <h1 className="text-2xl font-medium mb-5">Treading News</h1>
            <ArticleSubMenu />
            <div className="mt-5">
                <ArticleLists sportID={sportID} />
            </div>
        </>
    );
}

export default Articles;
