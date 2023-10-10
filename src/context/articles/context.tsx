import React, { createContext, useContext, useReducer } from "react";
import { articleReducer, initialState } from "./reducer";
import { ArticleListState, ArticlesDispatch } from "./types";

const ArticlesStateContext = createContext<ArticleListState>(initialState);
const ArticlesDispatchContext = createContext<ArticlesDispatch>(() => { });
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(articleReducer, initialState);
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