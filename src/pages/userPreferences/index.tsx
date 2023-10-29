import React, { useEffect } from 'react';
import PreferencesForm from './PreferencesForm';
import { useSportsDispatch } from '../../context/sports/context';
import { useTeamsDispatch } from '../../context/teams/context';
import { fetchSports } from '../../context/sports/actions';
import { fetchTeams } from '../../context/teams/actions';

export default function UserPreferences() {
    const sportsDispatch = useSportsDispatch();
    const TeamsDispatch = useTeamsDispatch();
    useEffect(() => {
        fetchSports(sportsDispatch);
        fetchTeams(TeamsDispatch);
    }, []);
    return (
        <>
            <PreferencesForm />
        </>
    );
}
