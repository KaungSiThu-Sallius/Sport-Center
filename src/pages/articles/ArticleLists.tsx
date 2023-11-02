/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useArticlesState } from "../../context/articles/context";
import React from "react";
import { formatDate } from "../../config/dateFormat";
import { Link } from "react-router-dom";
import { useUserPreferencesState } from "../../context/userPreferences/context";

export default function ArticleLists(props) {
    const sportID = props.sportID;
    let state: any = useArticlesState();
    const token = localStorage.getItem("authToken") ?? "";
    const { articlesDataList, isLoading, isError, errorMessage } = state

    const userPreferenceState: any = useUserPreferencesState();
    const { userpreferencesDataList, isUserPreferenceLoading, isUserPreferenceError, errorUserPreferenceMessage } = userPreferenceState
    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }
    let filteredArticles = sportID
        ? articlesDataList.filter((article) => {
            return article.sport.id == sportID;
        })
        : articlesDataList;



    if (token) {
        if (userpreferencesDataList.sports && userpreferencesDataList.sports.length > 0) {
            filteredArticles = filteredArticles.filter(article => userpreferencesDataList.sports.includes(article.sport.id));
        }

        if (userpreferencesDataList.teams && userpreferencesDataList.teams.length > 0) {
            filteredArticles = filteredArticles.filter(article => {
                if (article.teams && article.teams.length > 0) {
                    const hasMatchingTeam = article.teams.some(team => userpreferencesDataList.teams.includes(team.id));
                    return hasMatchingTeam;
                } else {
                    return false;
                }
            });
        }
    }
    // console.log(filteredArticles);
    return (
        <>
            {filteredArticles.map((article: any) => (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-5" key={article.id}>
                    <div className="flex">
                        <div className="w-2/3 p-4">
                            <p className="text-xs text-gray-500">{article.sport.name}</p>
                            <h2 className="text-xl font-semibold">{article.title}</h2>
                            <p className="text-sm">{article.summary}</p>

                            {sportID ?
                                <Link to={`/articles/${article.sport.id}/${article.id}`}>
                                    <button
                                        id="taskDetailBtn"
                                        className="text-blue-500 underline"
                                    >
                                        Read more
                                    </button>
                                </Link>

                                : <Link to={`/articles/${article.id}`}>
                                    <button
                                        id="taskDetailBtn"
                                        className="text-blue-500 underline"
                                    >
                                        Read more
                                    </button>
                                </Link>}


                            <p className="text-gray-400 text-sm mt-2">{formatDate(article.date)}</p>
                        </div>
                        <div className="w-1/3 h-48">
                            <div className="aspect-w-4 aspect-h-3">
                                <img src={article.thumbnail} alt="Article Thumbnail" className="w-full h-40" />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </>
    );


}

