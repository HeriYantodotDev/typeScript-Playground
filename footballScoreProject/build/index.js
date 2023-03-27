"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MatchReader_1 = require("./MatchReader");
const path_1 = __importDefault(require("path"));
const TypesThisProject_1 = require("./TypesThisProject");
const CSVFileReader_1 = require("./CSVFileReader");
function generateMatchesArray() {
    const CSV_PATH = path_1.default.join(__dirname, '..', 'data', 'football.csv');
    const matches = new MatchReader_1.MatchReader(new CSVFileReader_1.CSVFileReader(CSV_PATH));
    console.log(matches.matches[0][0]);
    console.log(matches.matches[0][1]);
    console.log(matches.matches[0][2]);
    console.log(matches.matches[0][3]);
    console.log(matches.matches[0][4]);
    console.log(matches.matches[0][5]);
    console.log(matches.matches[0][6]);
    return matches.matches;
}
function statisticAnalyzer(matchesArray, club) {
    let totalGame = 0;
    let totalHomeGame = 0;
    let totalAwayGame = 0;
    let homeWin = 0;
    let awayWin = 0;
    let totalWin = 0;
    let homeLose = 0;
    let awayLose = 0;
    let totalLose = 0;
    let totalGoalHome = 0;
    let totalGoalAway = 0;
    matchesArray.forEach(element => {
        if (element[1] === club) {
            totalHomeGame++;
        }
        ;
        if (element[2] === club) {
            totalAwayGame++;
        }
        ;
        if (element[1] === club && element[5] === TypesThisProject_1.MATCH_RESULT.HOME_WIN) {
            homeWin++;
        }
        ;
        if (element[2] === club && element[5] === TypesThisProject_1.MATCH_RESULT.AWAY_WIN) {
            awayWin++;
        }
        ;
    });
    totalWin = homeWin + awayWin;
    totalGame = totalHomeGame + totalAwayGame;
    homeLose = totalHomeGame - homeWin;
    awayLose = totalAwayGame - awayWin;
    totalLose = homeLose + awayLose;
    return {
        homeWin,
        awayWin,
        totalWin,
        homeLose,
        awayLose,
        totalHomeGame,
        totalAwayGame,
        totalGame,
        totalLose
    };
}
;
function test() {
    let horrayVariable = 'Okay';
    horrayVariable = 'Kimak';
    horrayVariable = 'Fuck';
    console.log(horrayVariable);
}
(function main() {
    const matchesArray = generateMatchesArray();
    const manUnitedWin = statisticAnalyzer(matchesArray, 'Man United');
    console.table(manUnitedWin);
})();
