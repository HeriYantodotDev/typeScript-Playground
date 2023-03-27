import fs from 'fs';

export abstract class CSVFileReader<T> {
  protected abstract data: T;

  constructor(public filePath: string) {
  }

  protected abstract mapRow(): void

  protected read(): string[][] {
    return fs.readFileSync(this.filePath, {
      encoding: 'utf-8'
    })
      .split('\n')
      .map((element: string): string[]=> {
        return element.split(',');
      });
  };

  abstract get dataArray(): T;
};