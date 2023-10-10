/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";
import initialData from "./initialData";
import { ArticleData, ArticleListState,ArticleListAvailableAction,ArticleActions } from "./types";

export const initialState: ArticleListState = {
  ArticleData: initialData,
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const articleReducer: Reducer<ArticleListState, ArticleActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ArticleListAvailableAction.FETCH_ARTICLES_REQUEST:
      return { ...state, isLoading: true };
    case ArticleListAvailableAction.FETCH_ARTICLES_SUCCESS:
      return { ...state, isLoading: false, ArticleData: action.payload };
    case ArticleListAvailableAction.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case ArticleListAvailableAction.REORDER_ARTICLES:
      return { ...state, isLoading: false, ArticleData: action.payload };
    default:
      return state;
  }
};