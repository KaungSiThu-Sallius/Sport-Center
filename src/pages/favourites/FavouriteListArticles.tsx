
import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useArticlesState } from '../../context/articles/context'
import { useTeamsState } from '../../context/teams/context';
import { useSportsState } from '../../context/sports/context';
import { useUserPreferencesState } from "../../context/userPreferences/context";
import { Link } from 'react-router-dom'

export default function FavouriteListArticles() {
    const token = localStorage.getItem("authToken") ?? "";

    let articleState: any = useArticlesState();
    const articlesData = articleState;
    let sportState: any = useSportsState();
    let sportsData = sportState;
    let teamState: any = useTeamsState();
    const teamData = teamState;

    if (articlesData.isLoading || sportsData.isLoading || teamData.isLoading) {
        return <span>Loading...</span>;
    }

    if (articlesData.isError || sportsData.isError || teamData.isError) {
        return <span>Error Occured</span>;
    }
    const sportInitial = {
        name: "Select Sport",
        id: "100000"
    }

    const teamInitial = {
        name: "Select Team",
        id: "100000"
    }

    const [sportSelected, setSportSelected] = useState(sportInitial)
    const [teamSelected, setTeamSelected] = useState(teamInitial)

    let filteredArticles = articlesData.articlesDataList;

    const userpreferencesDataList = useUserPreferencesState();
    let userPreferenceData = userpreferencesDataList.userpreferencesDataList;
    let userPreferenceSports = userPreferenceData.sports;
    let userPreferenceTeams = userPreferenceData.teams;


    let sportNamesData = sportsData.sportsDataList
    let teamNamesData = teamData.teamsDataList
    if (userPreferenceSports && userPreferenceSports.length > 0) {
        const sportNames = userPreferenceSports.map((id) => {
            const sport = sportsData.sportsDataList.find((sport) => sport.id === id);
            return sport ? sport.name : null;
        });

        sportNamesData = sportNamesData.filter(sport => sportNames.includes(sport.name));
    }

    if (userPreferenceTeams && userPreferenceTeams.length > 0) {
        const teamNames = userPreferenceTeams.map((id) => {
            const team = teamData.teamsDataList.find((team) => team.id === id);
            return team ? team.name : null;
        });

        teamNamesData = teamNamesData.filter(team => teamNames.includes(team.name));

    }


    if (sportSelected) {
        filteredArticles = articlesData.articlesDataList.filter((article) => {
            return article.sport.name === sportSelected.name;
        });
    }

    if (teamSelected) {
        if (teamSelected.name != "Select Team") {
            filteredArticles = filteredArticles.filter((article) => {
                return article.teams.some((team) => team.name === teamSelected.name);
            });
        }
    }


    return (
        <>
            <Listbox value={sportSelected} onChange={setSportSelected}>
                <div className="relative mt-1 mb-5" style={{ zIndex: 100 }}>
                    <Listbox.Button
                        className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{sportSelected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options
                            className="absolute mt-1  w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {sportNamesData.map((sport, sportIdx) => (
                                <Listbox.Option key={sportIdx} className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                    value={sport}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {sport.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            <Listbox value={teamSelected} onChange={setTeamSelected}>
                <div className="relative mt-1 mb-8">
                    <Listbox.Button
                        className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{teamSelected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options
                            className="absolute mt-1  w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {teamNamesData.map((team, teamIdx) => (
                                <Listbox.Option key={teamIdx} className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                    value={team}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {team.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>



            {filteredArticles.slice(0, 10).map((article: any) => (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-5" key={article.id}>
                    <div className="flex">
                        <div className="p-4">
                            <h2 className="text-md font-semibold">{article.title}</h2>
                            <p className="text-sm">{article.summary}</p>

                            <Link to={`/articles/${article.id}`}>
                                <button
                                    id="taskDetailBtn"
                                    className="text-blue-500 underline"
                                >
                                    Read more
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}



        </>
    )
}