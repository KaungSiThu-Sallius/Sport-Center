// Import required type annotations
import { API_ENDPOINT } from "../../config/constants";
import { MatchData, MatchListAvailableAction, MatchesDispatch } from "./types";
export const reorderTasks = (dispatch: MatchesDispatch, newState: MatchData)  => {
  dispatch({type: MatchListAvailableAction.REORDER_MATCHES, payload: newState})
}


export const fetchMatches = async (
  dispatch: MatchesDispatch,
) => {
  // const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: MatchListAvailableAction.FETCH_MATCHES_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/matches`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch matches");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: MatchListAvailableAction.FETCH_MATCHES_SUCCESS,
      payload: data.matches,
    });
    console.dir(data.matches);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: MatchListAvailableAction.FETCH_MATCHES_FAILURE,
      payload: "Unable to load matches",
    });
  }
};

