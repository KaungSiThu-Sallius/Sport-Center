/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";
import initialData from "./initialData";
import { TeamData, TeamListState,TeamListAvailableAction,TeamActions } from "./types";

export const initialState: TeamListState = {
  teamsDataList: initialData,
  isTeamLoading: false,
  isTeamError: false,
  errorTeamMessage: "",
};
export const reducer = (
  state:TeamListState = initialState,
  action
) => {
  switch (action.type) {
    case TeamListAvailableAction.FETCH_TEAMS_REQUEST:
      return { ...state, isTeamLoading: true };
    case TeamListAvailableAction.FETCH_TEAMS_SUCCESS:
      return { ...state, isTeamLoading: false, teamsDataList: action.payload };
    case TeamListAvailableAction.FETCH_TEAMS_FAILURE:
      return {
        ...state,
        isTeamLoading: false,
        isTeamError: true,
        errorMessage: action.payload,
      };

    case TeamListAvailableAction.REORDER_TEAMS:
      return { ...state, isTeamLoading: false, teamsDataList: action.payload };
    default:
      return state;
  }
};