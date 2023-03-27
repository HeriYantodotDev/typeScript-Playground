import fs from 'fs';

export class CSVFileReader {
  data: string[][] = [];

  constructor(public filePath: string) {
  }

  read(): void {
    this.data = fs.readFileSync(this.filePath, {
      encoding: 'utf-8'
    })
      .split('\n')
      .map((element: string): string[]=> {
        return element.split(',');
      });
  };
};