"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readCSVData(path) {
    return fs_1.default.readFileSync(path, {
        encoding: 'utf-8'
    });
}
;
function parseStringtoArrayString2D(data) {
    return data
        .split('\n')
        .map((row) => {
        return row.split(',');
    });
}
;
function generateListScore() {
    const CSV_PATH = path_1.default.join(__dirname, '..', 'data', 'football.csv');
    const matches = readCSVData(CSV_PATH);
    return parseStringtoArrayString2D(matches);
}
;
;
function winCount(matchesArray, club) {
    let MATCH_RESULT;
    (function (MATCH_RESULT) {
        MATCH_RESULT["HOME_WIN"] = "H";
        MATCH_RESULT["AWAY_WIN"] = "A";
        MATCH_RESULT["DRAW"] = "D";
    })(MATCH_RESULT || (MATCH_RESULT = {}));
    let totalGame = 0;
    let totalHomeGame = 0;
    let totalAwayGame = 0;
    let homeWin = 0;
    let awayWin = 0;
    let totalWin = 0;
    let homeLose = 0;
    let awayLose = 0;
    let totalLose = 0;
    matchesArray.forEach(element => {
        if (element[1] === club) {
            totalHomeGame++;
        }
        ;
        if (element[2] === club) {
            totalAwayGame++;
        }
        ;
        if (element[1] === club && element[5] === MATCH_RESULT.HOME_WIN) {
            homeWin++;
        }
        ;
        if (element[2] === club && element[5] === MATCH_RESULT.AWAY_WIN) {
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
function main() {
    const matchesArray = generateListScore();
    const manUnitedWin = winCount(matchesArray, 'Man United');
    console.table(manUnitedWin);
}
main();
