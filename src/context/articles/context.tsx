import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { ArticleListState, ArticlesDispatch } from "./types";

const ArticlesStateContext = createContext<ArticleListState | undefined>(undefined);
const ArticlesDispatchContext = createContext<ArticlesDispatch>(() => { });
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ArticlesStateContext.Provider value={state}>
            <ArticlesDispatchContext.Provider value={dispatch}>
                {children}
            </ArticlesDispatchContext.Provider>
        </ArticlesStateContext.Provider>
    );
};


export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);