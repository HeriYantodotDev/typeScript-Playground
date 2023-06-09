"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchReader = void 0;
const utils_1 = require("./utils");
class MatchReader {
    constructor(reader) {
        this.reader = reader;
        this.matches = [];
        this.load();
    }
    load() {
        this.reader.read();
        this.mapRow();
    }
    mapRow() {
        this.reader.data
            .forEach((row) => {
            this.pushDataToArray(row);
        });
    }
    pushDataToArray(row) {
        this.matches.push(this.splitStringAndParseToDataType(row));
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
    get readerData() {
        const { filePath, data } = this.reader;
        return {
            filePath,
            data
        };
    }
}
exports.MatchReader = MatchReader;
