export enum SportListAvailableAction {
  FETCH_SPORTS_REQUEST = "FETCH_SPORTS_REQUEST",
  FETCH_SPORTS_SUCCESS = "FETCH_SPORTS_SUCCESS",
  FETCH_SPORTS_FAILURE = "FETCH_SPORTS_FAILURE",

  REORDER_SPORTS = "REORDER_SPORTS",
}

export type SportActions =
  | { type: SportListAvailableAction.REORDER_SPORTS; payload: SportData }
  | { type: SportListAvailableAction.FETCH_SPORTS_REQUEST }
  | { type: SportListAvailableAction.FETCH_SPORTS_SUCCESS; payload: SportData }
  | { type: SportListAvailableAction.FETCH_SPORTS_FAILURE; payload: string }
;

// A type to hold dispatch actions in a context.
export type SportsDispatch = React.Dispatch<SportActions>;


export type SportData = {
  id: number;
  name: string;
};


export interface SportListState {
  sportsDataList: SportData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}