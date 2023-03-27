"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
class CSVFileReader {
    constructor(filePath) {
        this.filePath = filePath;
    }
    read() {
        return fs_1.default.readFileSync(this.filePath, {
            encoding: 'utf-8'
        })
            .split('\n')
            .map((element) => {
            return element.split(',');
        });
    }
    ;
}
exports.CSVFileReader = CSVFileReader;
;
