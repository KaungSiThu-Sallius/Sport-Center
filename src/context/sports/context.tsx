import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { SportListState, SportsDispatch } from "./types";

const SportsStateContext = createContext<SportListState | undefined>(undefined);
const SportsDispatchContext = createContext<SportsDispatch>(() => { });
export const SportsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SportsStateContext.Provider value={state}>
            <SportsDispatchContext.Provider value={dispatch}>
                {children}
            </SportsDispatchContext.Provider>
        </SportsStateContext.Provider>
    );
};


export const useSportsState = () => useContext(SportsStateContext);
export const useSportsDispatch = () => useContext(SportsDispatchContext);