// Import required type annotations
import { API_ENDPOINT } from "../../config/constants";
import { UserPreferenceData, UserPreferenceListAvailableAction, UserPreferencesDispatch } from "./types";
export const reorderTasks = (dispatch: UserPreferencesDispatch, newState: UserPreferenceData)  => {
  dispatch({type: UserPreferenceListAvailableAction.REORDER_USERPREFERENCES, payload: newState})
}


export const fetchUserPreferences = async (
  dispatch: UserPreferencesDispatch,
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/user/preferences`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch userpreferences");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_SUCCESS,
      payload: data.preferences,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_FAILURE,
      payload: "Unable to load userpreferences",
    });
  }
};

export const patchPreference = async (
  dispatch: UserPreferencesDispatch,
  sports: any,
  teams: any
) => {

  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/user/preferences`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify({
                    preferences: {
                        teams: teams, // Use the selectedTeams state
                        sports: sports, // Use the selectedSports state
                    },
                }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    dispatch({ type: UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_SUCCESS });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_FAILURE,
      payload: "Unable to create task",
    });
  }
};

