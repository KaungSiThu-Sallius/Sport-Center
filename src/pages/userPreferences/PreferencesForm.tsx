import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSportsState } from '../../context/sports/context';
import { useTeamsState } from '../../context/teams/context';

import { API_ENDPOINT } from '../../config/constants';
import { patchPreference } from '../../context/userPreferences/actions';
import { useUserPreferencesDispatch } from '../../context/userPreferences/context';


export default function PreferencesForm() {
    let [isOpen, setIsOpen] = useState(true);
    const token = localStorage.getItem("authToken") ?? "";

    let state: any = useSportsState();
    let teamState: any = useTeamsState();
    const preferenceDispatch = useUserPreferencesDispatch();
    // let userPreferenceState: any = useUserPreferencesState();


    const { sportsDataList, isLoading, isError, errorMessage } = state
    const { teamsDataList, isTeamLoading, isTeamError, errorTeamMessage } = teamState
    // const { userpreferencesDataList, isUserPreferenceLoading, isUserPreferenceError, errorUserPreferenceMessage } = userPreferenceState

    // const sportListsArr = userpreferencesDataList['sports'];
    // const teamListsArr = userpreferencesDataList['teams'];

    const [selectedSports, setSelectedSports] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);

    useEffect(() => {
        // Include the Authorization header in the headers object
        const headers = {
            'Authorization': `Bearer ${token}`, // Add the Bearer token
        };

        // Fetch user preferences data from your API (e.g., /api/user/preferences)
        fetch(`${API_ENDPOINT}/user/preferences`, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                const { sports, teams } = data.preferences;
                setSelectedSports(sports);
                setSelectedTeams(teams);

            })
            .catch((error) => {
                console.error('Failed to fetch user preferences:', error);

            });
    }, []);


    let navigate = useNavigate();
    function closeModal() {
        setIsOpen(false);
        navigate("/");
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleSportChange = (sport) => {
        if (selectedSports.includes(sport)) {
            setSelectedSports(selectedSports.filter((item) => item !== sport));
        } else {
            setSelectedSports([...selectedSports, sport]);
        }
    };

    const handleTeamChange = (team) => {
        if (selectedTeams.includes(team)) {
            setSelectedTeams(selectedTeams.filter((item) => item !== team));
        } else {
            setSelectedTeams([...selectedTeams, team]);
        }
    };

    if (isLoading || isTeamLoading) {
        return <span>Loading...</span>;
    }

    if (isError || isTeamError) {
        return <span>{errorMessage}</span>;
    }


    const handleSavePreferences = async () => {
        try {

            // console.log(selectedTeams)
            // console.log(selectedSports)
            // console.log(token)
            // const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Authorization": `Bearer ${token}`
            //     },
            //     body: JSON.stringify({
            //         preferences: {
            //             teams: selectedTeams, // Use the selectedTeams state
            //             sports: selectedSports, // Use the selectedSports state
            //         },
            //     }),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to save preferences');
            // }
            patchPreference(preferenceDispatch, selectedSports, selectedTeams);

            console.log('Preferences saved successfully');
            closeModal();
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 text-gray-900"
                                    >
                                        User Preferences
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <label><b>Choose your favourite sports:</b></label>
                                        <div className="space-y-2">
                                            {sportsDataList.map((sport) => (
                                                <label key={sport.id} className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-500"
                                                        value={sport.name}
                                                        checked={selectedSports.includes(sport.id)}
                                                        onChange={() => handleSportChange(sport.id)}
                                                    />
                                                    <span className="ml-2 mr-4">{sport.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-7">
                                        <label><b>Choose your favourite teams:</b></label>
                                        <div className="space-y-2">
                                            {teamsDataList.map((team) => (
                                                <label key={team.id} className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-blue-500"
                                                        value={team.name}
                                                        checked={selectedTeams.includes(team.id)}
                                                        onChange={() => handleTeamChange(team.id)}
                                                    />
                                                    <span className="ml-2 mr-4">{team.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleSavePreferences}

                                        >
                                            Save Preferences
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
