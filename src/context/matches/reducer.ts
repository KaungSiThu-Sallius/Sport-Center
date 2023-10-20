/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";
import initialData from "./initialData";
import { MatchData, MatchListState,MatchListAvailableAction } from "./types";

export const initialState: MatchListState = {
  matchesDataList: initialData,
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const reducer = (
  state:MatchListState = initialState,
  action
) => {
  switch (action.type) {
    case MatchListAvailableAction.FETCH_MATCHES_REQUEST:
      return { ...state, isLoading: true };
    case MatchListAvailableAction.FETCH_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matchesDataList: action.payload };
    case MatchListAvailableAction.FETCH_MATCHES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case MatchListAvailableAction.REORDER_MATCHES:
      return { ...state, isLoading: false, matchesDataList: action.payload };
    default:
      return state;
  }
};