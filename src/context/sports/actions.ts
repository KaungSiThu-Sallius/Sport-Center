// Import required type annotations
import { API_ENDPOINT } from "../../config/constants";
import { SportData, SportListAvailableAction, SportsDispatch } from "./types";
export const reorderTasks = (dispatch: SportsDispatch, newState: SportData)  => {
  dispatch({type: SportListAvailableAction.REORDER_SPORTS, payload: newState})
}


export const fetchSports = async (
  dispatch: SportsDispatch,
) => {
  // const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: SportListAvailableAction.FETCH_SPORTS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/sports`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sports");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: SportListAvailableAction.FETCH_SPORTS_SUCCESS,
      payload: data.sports,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: SportListAvailableAction.FETCH_SPORTS_FAILURE,
      payload: "Unable to load sports",
    });
  }
};

