import { MatchType } from "./TypesThisProject";
import { dateStringToDate } from "./utils";
import { MATCH_RESULT } from "./TypesThisProject";

interface DataReader {
  read(): void;
  data: string[][];
  filePath: string;
}

export class MatchReader {
  matches: MatchType[] = [];
  constructor (protected reader: DataReader) {
    this.load();
  }

  private load(): void {
    this.reader.read();
    this.mapRow();
  }

  protected mapRow(): void {
    this.reader.data
      .forEach((row: string[]) => {
        this.pushDataToArray(row);
      })
  }

  protected pushDataToArray(row: string[]): void{
    this.matches.push(this.splitStringAndParseToDataType(row));
  };

  protected splitStringAndParseToDataType(row: string[]): MatchType {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as MATCH_RESULT,
      row[6]
    ];
  };
  
  get readerData() {
    const {filePath, data} = this.reader;
    
    return {
      filePath,
      data
    }
  }
}