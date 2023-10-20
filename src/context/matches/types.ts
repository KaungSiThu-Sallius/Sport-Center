export enum MatchListAvailableAction {
  FETCH_MATCHES_REQUEST = "FETCH_MATCHES_REQUEST",
  FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS",
  FETCH_MATCHES_FAILURE = "FETCH_MATCHES_FAILURE",

  REORDER_MATCHES = "REORDER_MATCHES",
}

export type MatchActions =
  | { type: MatchListAvailableAction.REORDER_MATCHES; payload: MatchData }
  | { type: MatchListAvailableAction.FETCH_MATCHES_REQUEST }
  | { type: MatchListAvailableAction.FETCH_MATCHES_SUCCESS; payload: MatchData }
  | { type: MatchListAvailableAction.FETCH_MATCHES_FAILURE; payload: string }
;

// A type to hold dispatch actions in a context.
export type MatchesDispatch = React.Dispatch<MatchActions>;


export type Team = {
  id: number;
  name: string;
}

export type MatchData = {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: Team[];
};


export interface MatchListState {
  matchesDataList: MatchData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}