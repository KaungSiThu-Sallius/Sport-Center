export enum TeamListAvailableAction {
  FETCH_TEAMS_REQUEST = "FETCH_TEAMS_REQUEST",
  FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS",
  FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE",

  REORDER_TEAMS = "REORDER_TEAMS",
}

export type TeamActions =
  | { type: TeamListAvailableAction.REORDER_TEAMS; payload: TeamData }
  | { type: TeamListAvailableAction.FETCH_TEAMS_REQUEST }
  | { type: TeamListAvailableAction.FETCH_TEAMS_SUCCESS; payload: TeamData }
  | { type: TeamListAvailableAction.FETCH_TEAMS_FAILURE; payload: string }
;

// A type to hold dispatch actions in a context.
export type TeamsDispatch = React.Dispatch<TeamActions>;


export type TeamData = {
  id: number;
  name: string;
  plays: string
};


export interface TeamListState {
  teamsDataList: TeamData[];
  isTeamLoading: boolean;
  isTeamError: boolean;
  errorTeamMessage: string;
}