import React, { useEffect } from 'react'
import FavouriteListArticles from './FavouriteListArticles'
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/actions";
import { useTeamsDispatch } from '../../context/teams/context';
import { fetchTeams } from '../../context/teams/actions';

export default function Favourite() {
    const articlesDispatch = useArticlesDispatch();
    const sportsDispatch = useSportsDispatch();
    const teamsDispatch = useTeamsDispatch();


    useEffect(() => {
        fetchArticles(articlesDispatch);
        fetchSports(sportsDispatch);
        fetchTeams(teamsDispatch);
    }, []);
    return (
        <div className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="">
                <h3 className='text-lg font-bold mb-3'>Favorites</h3>
                <FavouriteListArticles />
            </div>
        </div>


    )
}