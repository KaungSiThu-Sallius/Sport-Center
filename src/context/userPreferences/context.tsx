import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { UserPreferenceListState, UserPreferencesDispatch } from "./types";

const UserPreferencesStateContext = createContext<UserPreferenceListState | undefined>(undefined);
const UserPreferencesDispatchContext = createContext<UserPreferencesDispatch>(() => { });
export const UserPreferencesProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserPreferencesStateContext.Provider value={state}>
            <UserPreferencesDispatchContext.Provider value={dispatch}>
                {children}
            </UserPreferencesDispatchContext.Provider>
        </UserPreferencesStateContext.Provider>
    );
};


export const useUserPreferencesState = () => useContext(UserPreferencesStateContext);
export const useUserPreferencesDispatch = () => useContext(UserPreferencesDispatchContext);