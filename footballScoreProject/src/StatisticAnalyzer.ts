import { MatchType } from "./TypesThisProject";
import { WinCountReturnType } from "./TypesThisProject";
import { MATCH_RESULT } from "./TypesThisProject";

export class StatisticAnalyzer {
  private totalGame = 0;
  private totalHomeGame = 0;
  private totalAwayGame = 0;
  private homeWin = 0;
  private awayWin = 0;
  private totalWin = 0;
  private homeLose = 0;
  private awayLose = 0;
  private totalLose = 0;
  private totalGoalHome = 0;
  private totalGoalAway = 0;
  private totalGoal = 0;

  constructor(private matchesArray: MatchType[], private club: string) {
    this.analyze();
  }

  private analyze(): void {
    this.matchesArray.forEach(element => {
      if (element[1] === this.club) {
        this.totalHomeGame++;
        this.totalGoalHome+= element[3];
      };
  
      if (element[2] === this.club) {
        this.totalAwayGame++;
        this.totalGoalAway+= element[4];
      };
  
      if (element[1] === this.club && element[5] === MATCH_RESULT.HOME_WIN)  {
        this.homeWin++;
      };
      
      if (element[2] === this.club && element[5] === MATCH_RESULT.AWAY_WIN) {
        this.awayWin++
      };
    });
  
    this.totalWin = this.homeWin + this.awayWin;
    this.totalGame = this.totalHomeGame + this.totalAwayGame;
    this.homeLose = this.totalHomeGame - this.homeWin;
    this.awayLose = this.totalAwayGame - this.awayWin;
    this.totalLose = this.homeLose + this.awayLose;
    this.totalGoal = this.totalGoalHome + this.totalGoalAway;
  }

  get statistics(): WinCountReturnType {
    const { 
      totalGame,
      totalHomeGame,
      totalAwayGame,
      homeWin,
      awayWin,
      totalWin,
      homeLose,
      awayLose,
      totalLose,
      totalGoalHome,
      totalGoalAway,
      totalGoal,
    } = this;
  
    return {
      totalGame,
      totalHomeGame,
      totalAwayGame,
      homeWin,
      awayWin,
      totalWin,
      homeLose,
      awayLose,
      totalLose,
      totalGoalHome,
      totalGoalAway,
      totalGoal,
    };
  }

  printReport() {
    console.table(this.statistics);
  }
}