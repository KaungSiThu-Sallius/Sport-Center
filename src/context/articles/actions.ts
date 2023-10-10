// Import required type annotations
import { API_ENDPOINT } from "../../config/constants";
import { ArticleData, ArticleListAvailableAction, ArticlesDispatch } from "./types";
export const reorderTasks = (dispatch: ArticlesDispatch, newState: ArticleData)  => {
  dispatch({type: ArticleListAvailableAction.REORDER_ARTICLES, payload: newState})
}


export const fetchArticles = async (
  dispatch: ArticlesDispatch,
) => {
  // const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ArticleListAvailableAction.FETCH_ARTICLES_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/articles`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLES_SUCCESS,
      payload: data,
    });
    console.dir(data);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLES_FAILURE,
      payload: "Unable to load articles",
    });
  }
};

