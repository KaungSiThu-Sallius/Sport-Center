import React, { useEffect } from 'react';
import PreferencesForm from './PreferencesForm';
import { useSportsDispatch } from '../../context/sports/context';
import { useTeamsDispatch } from '../../context/teams/context';
import { fetchSports } from '../../context/sports/actions';
import { fetchTeams } from '../../context/teams/actions';
import { useUserPreferencesDispatch } from '../../context/userPreferences/context';
import { fetchUserPreferences } from '../../context/userPreferences/actions';

export default function UserPreferences() {
    const sportsDispatch = useSportsDispatch();
    const TeamsDispatch = useTeamsDispatch();
    const userPreferencesDispatch = useUserPreferencesDispatch();
    useEffect(() => {
        fetchSports(sportsDispatch);
        fetchTeams(TeamsDispatch);

    }, []);

    useEffect(() => {
        fetchUserPreferences(userPreferencesDispatch);
    }, []);
    return (
        <>

            <PreferencesForm />
        </>
    );
}
