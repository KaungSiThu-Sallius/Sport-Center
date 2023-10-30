/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";
import initialData from "./initialData";
import { UserPreferenceData, UserPreferenceListState,UserPreferenceListAvailableAction,UserPreferenceActions } from "./types";

export const initialState: UserPreferenceListState = {
  userpreferencesDataList: initialData,
  isUserPreferenceLoading: false,
  isUserPreferenceError: false,
  errorUserPreferenceMessage: "",
};
export const reducer = (
  state:UserPreferenceListState = initialState,
  action
) => {
  switch (action.type) {
    case UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_REQUEST:
      return { ...state, isUserPreferenceLoading: true };
    case UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_SUCCESS:
      return { ...state, isUserPreferenceLoading: false, userpreferencesDataList: action.payload };
    case UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_FAILURE:
      return {
        ...state,
        isUserPreferenceLoading: false,
        isUserPreferenceError: true,
        errorMessage: action.payload,
      };

    case UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_REQUEST:
      return { ...state, isLoading: true };
    case UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_SUCCESS:
      return { ...state, isLoading: false };
    case UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case UserPreferenceListAvailableAction.REORDER_USERPREFERENCES:
      return { ...state, isUserPreferenceLoading: false, userpreferencesDataList: action.payload };
    default:
      return state;
  }
};