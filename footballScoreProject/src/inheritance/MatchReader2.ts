import { CSVFileReader } from "./CSVFileReader2";
import { MatchType } from "../TypesThisProject";
import { dateStringToDate } from "../utils";
import { MATCH_RESULT } from "../TypesThisProject";


export class MatchReader extends CSVFileReader<MatchType[]> {
  protected data: MatchType[] = [];

  constructor(filepath: string) {
    super(filepath);
    this.mapRow();
  }

  protected mapRow(): void {
    this.read()
      .forEach((row: string[]) => {
        this.pushDataToArray(row);
      })
  }

  protected pushDataToArray(row: string[]): void{
    this.data.push(this.splitStringAndParseToDataType(row));
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

  get dataArray(): MatchType[] {
      return this.data;
  }
}