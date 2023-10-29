import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { TeamListState, TeamsDispatch } from "./types";

const TeamsStateContext = createContext<TeamListState | undefined>(undefined);
const TeamsDispatchContext = createContext<TeamsDispatch>(() => { });
export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TeamsStateContext.Provider value={state}>
            <TeamsDispatchContext.Provider value={dispatch}>
                {children}
            </TeamsDispatchContext.Provider>
        </TeamsStateContext.Provider>
    );
};


export const useTeamsState = () => useContext(TeamsStateContext);
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);