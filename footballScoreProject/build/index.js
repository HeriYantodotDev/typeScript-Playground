"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MatchReader_1 = require("./MatchReader");
const path_1 = __importDefault(require("path"));
const CSVFileReader_1 = require("./CSVFileReader");
const StatisticAnalyzer_1 = require("./StatisticAnalyzer");
(function main() {
    const CSV_PATH = path_1.default.join(__dirname, '..', 'data', 'football.csv');
    const matches = new MatchReader_1.MatchReader(new CSVFileReader_1.CSVFileReader(CSV_PATH));
    const matchesArray = matches.matches;
    const manUnitedStatistics = new StatisticAnalyzer_1.StatisticAnalyzer(matchesArray, 'Man United');
    manUnitedStatistics.printReport();
})();
