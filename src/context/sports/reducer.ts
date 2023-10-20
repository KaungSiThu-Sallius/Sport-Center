/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";
import initialData from "./initialData";
import { SportData, SportListState,SportListAvailableAction,SportActions } from "./types";

export const initialState: SportListState = {
  sportsDataList: initialData,
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const reducer = (
  state:SportListState = initialState,
  action
) => {
  switch (action.type) {
    case SportListAvailableAction.FETCH_SPORTS_REQUEST:
      return { ...state, isLoading: true };
    case SportListAvailableAction.FETCH_SPORTS_SUCCESS:
      return { ...state, isLoading: false, sportsDataList: action.payload };
    case SportListAvailableAction.FETCH_SPORTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case SportListAvailableAction.REORDER_SPORTS:
      return { ...state, isLoading: false, sportsDataList: action.payload };
    default:
      return state;
  }
};