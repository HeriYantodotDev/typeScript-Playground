"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchReader = void 0;
const CSVFileReader2_1 = require("./CSVFileReader2");
const utils_1 = require("../utils");
class MatchReader extends CSVFileReader2_1.CSVFileReader {
    constructor(filepath) {
        super(filepath);
        this.data = [];
        this.mapRow();
    }
    mapRow() {
        this.read()
            .forEach((row) => {
            this.pushDataToArray(row);
        });
    }
    pushDataToArray(row) {
        this.data.push(this.splitStringAndParseToDataType(row));
    }
    ;
    splitStringAndParseToDataType(row) {
        return [
            (0, utils_1.dateStringToDate)(row[0]),
            row[1],
            row[2],
            parseInt(row[3]),
            parseInt(row[4]),
            row[5],
            row[6]
        ];
    }
    ;
    get dataArray() {
        return this.data;
    }
}
exports.MatchReader = MatchReader;
