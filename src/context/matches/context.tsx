import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { MatchListState, MatchesDispatch } from "./types";

const MatchesStateContext = createContext<MatchListState | undefined>(undefined);
const MatchesDispatchContext = createContext<MatchesDispatch>(() => { });
export const MatchesProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {


    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MatchesStateContext.Provider value={state}>
            <MatchesDispatchContext.Provider value={dispatch}>
                {children}
            </MatchesDispatchContext.Provider>
        </MatchesStateContext.Provider>
    );
};


export const useMatchesState = () => useContext(MatchesStateContext);
export const useMatchesDispatch = () => useContext(MatchesDispatchContext);