export enum MATCH_RESULT {
  HOME_WIN = "H",
  AWAY_WIN = "A",
  DRAW = "D"
  };

export type MatchType = [Date, string, string, number, number, MATCH_RESULT, string];

export interface WinCountReturnType {
  homeWin: number,
  awayWin: number,
  totalWin: number,
  homeLose: number,
  awayLose: number,
  totalHomeGame: number,
  totalAwayGame: number,
  totalGame: number,
  totalLose: number,
}