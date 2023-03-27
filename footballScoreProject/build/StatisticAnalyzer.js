"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticAnalyzer = void 0;
const TypesThisProject_1 = require("./TypesThisProject");
class StatisticAnalyzer {
    constructor(matchesArray, club) {
        this.matchesArray = matchesArray;
        this.club = club;
        this.totalGame = 0;
        this.totalHomeGame = 0;
        this.totalAwayGame = 0;
        this.homeWin = 0;
        this.awayWin = 0;
        this.totalWin = 0;
        this.homeLose = 0;
        this.awayLose = 0;
        this.totalLose = 0;
        this.totalGoalHome = 0;
        this.totalGoalAway = 0;
        this.totalGoal = 0;
        this.analyze();
    }
    analyze() {
        this.matchesArray.forEach(element => {
            if (element[1] === this.club) {
                this.totalHomeGame++;
                this.totalGoalHome += element[3];
            }
            ;
            if (element[2] === this.club) {
                this.totalAwayGame++;
                this.totalGoalAway += element[4];
            }
            ;
            if (element[1] === this.club && element[5] === TypesThisProject_1.MATCH_RESULT.HOME_WIN) {
                this.homeWin++;
            }
            ;
            if (element[2] === this.club && element[5] === TypesThisProject_1.MATCH_RESULT.AWAY_WIN) {
                this.awayWin++;
            }
            ;
        });
        this.totalWin = this.homeWin + this.awayWin;
        this.totalGame = this.totalHomeGame + this.totalAwayGame;
        this.homeLose = this.totalHomeGame - this.homeWin;
        this.awayLose = this.totalAwayGame - this.awayWin;
        this.totalLose = this.homeLose + this.awayLose;
        this.totalGoal = this.totalGoalHome + this.totalGoalAway;
    }
    get statistics() {
        const { totalGame, totalHomeGame, totalAwayGame, homeWin, awayWin, totalWin, homeLose, awayLose, totalLose, totalGoalHome, totalGoalAway, totalGoal, } = this;
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
exports.StatisticAnalyzer = StatisticAnalyzer;
