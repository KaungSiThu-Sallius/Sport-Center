export enum ArticleListAvailableAction {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE",

  REORDER_ARTICLES = "REORDER_ARTICLES",
}

export type ArticleActions =
  | { type: ArticleListAvailableAction.REORDER_ARTICLES; payload: ArticleData }
  | { type: ArticleListAvailableAction.FETCH_ARTICLES_REQUEST }
  | { type: ArticleListAvailableAction.FETCH_ARTICLES_SUCCESS; payload: ArticleData }
  | { type: ArticleListAvailableAction.FETCH_ARTICLES_FAILURE; payload: string }
;

// A type to hold dispatch actions in a context.
export type ArticlesDispatch = React.Dispatch<ArticleActions>;


export type SportDetails = {
  id: number;
  name: string;
};

export type Team = {
  id: number;
  name: string;
}

export type ArticleData = {
  id: number;
  title: string;
  thumbnail: string;
  sport: SportDetails;
  date: string;
  summary: string;
  teams: Team[];
};


export interface ArticleListState {
  ArticleData: ArticleData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}