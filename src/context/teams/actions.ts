// Import required type annotations
import { API_ENDPOINT } from "../../config/constants";
import { TeamData, TeamListAvailableAction, TeamsDispatch } from "./types";
export const reorderTasks = (dispatch: TeamsDispatch, newState: TeamData)  => {
  dispatch({type: TeamListAvailableAction.REORDER_TEAMS, payload: newState})
}


export const fetchTeams = async (
  dispatch: TeamsDispatch,
) => {
  // const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TeamListAvailableAction.FETCH_TEAMS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/teams`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch teams");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: TeamListAvailableAction.FETCH_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: TeamListAvailableAction.FETCH_TEAMS_FAILURE,
      payload: "Unable to load teams",
    });
  }
};

