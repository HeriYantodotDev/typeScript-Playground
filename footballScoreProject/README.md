# Project: Football Score Analysis

Project idea: read data from CSV and then parse it and analyze it.
[Notion Link](https://www.notion.so/TypeScript-The-Complete-Developer-s-Guide-ba9582b22711462e862ffb314603e482?pvs=4#f3b9b2569f4d414badfd9fe99ff0b1e3)

## Project Set Up

- As usual set up folder `src` and `build`
- Initiate npm `npm init -y`
- intiate ts confic `tsc --init`
- Install nodemon and also concurrently
- download the csv file and put in the root folder.
- then we are ready to go
- install Type Definition Files for Nodejs
  - `npm install @types/node`

## Read CSV and Parse data

We’re going to read file from a csv called `football.csv`.

There for we need to read the data in that document, then parse it into a readable list.

here’s the code :

```tsx
import fs from 'fs';
import path from 'path';

function readCSVData(path: string): string {
  return fs.readFileSync(path, {
    encoding: 'utf-8',
  });
}

function parseStringtoArrayString2D(data: string): string[][] {
  return data.split('\n').map((row: string): string[] => {
    return row.split(',');
  });
}

const CSV_PATH = path.join(__dirname, '..', 'data', 'football.csv');
const matches = readCSVData(CSV_PATH);
const arrayMatches = parseStringtoArrayString2D(matches);

console.log(arrayMatches);
```

## Enum

> Using enum is a good way to declare constant.
> It’s good for documentation wihtin the code.

When to use Enums?

- follow near-identical syntax rules as normal objects
- creates an object with the same keys and values when converted from TS to JS
- primary goal is to signal to other engineers that these are all closely related values
- use whenever we have a small fixed set of values that are all closely related and known at compile time.

One of the idea like for `environment variable`

## Refactoring : `Inheritance`

What is Generics:

- Like function arguments, but for types in class/function definition
- allow us to define the type of a property/argument/return value at a future point
- Used heavily when writing reusable code

Example:

> Look at `CSVFileReader<T>` > `<T>` here could be anything . It could be like `<TypeOfData>`

```tsx
class HoldAnything<T> {
  data: T;
}

const holdNumber = new HoldAnything<number>();
//Now the type of Data is Number.
```

Example for this project:

```tsx
import fs from 'fs';

export abstract class CSVFileReader<T> {
  protected abstract data: T;

  constructor(public filePath: string) {}

  protected abstract mapRow(): void;

  protected read(): string[][] {
    return fs
      .readFileSync(this.filePath, {
        encoding: 'utf-8',
      })
      .split('\n')
      .map((element: string): string[] => {
        return element.split(',');
      });
  }

  abstract get dataArray(): T;
}
```

Here’s the full code for inheritance:

- `CSVFileReader2.ts`

  ```tsx
  import fs from 'fs';

  export abstract class CSVFileReader<T> {
    protected abstract data: T;

    constructor(public filePath: string) {}

    protected abstract mapRow(): void;

    protected read(): string[][] {
      return fs
        .readFileSync(this.filePath, {
          encoding: 'utf-8',
        })
        .split('\n')
        .map((element: string): string[] => {
          return element.split(',');
        });
    }

    abstract get dataArray(): T;
  }
  ```

- `MathReader2.ts`

  ```tsx
  import { CSVFileReader } from './CSVFileReader2';
  import { MatchType } from '../TypesThisProject';
  import { dateStringToDate } from '../utils';
  import { MATCH_RESULT } from '../TypesThisProject';

  export class MatchReader extends CSVFileReader<MatchType[]> {
    protected data: MatchType[] = [];

    constructor(filepath: string) {
      super(filepath);
      this.mapRow();
    }

    protected mapRow(): void {
      this.read().forEach((row: string[]) => {
        this.pushDataToArray(row);
      });
    }

    protected pushDataToArray(row: string[]): void {
      this.data.push(this.splitStringAndParseToDataType(row));
    }

    protected splitStringAndParseToDataType(row: string[]): MatchType {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MATCH_RESULT,
        row[6],
      ];
    }

    get dataArray(): MatchType[] {
      return this.data;
    }
  }
  ```

## Refactoring: Alternative - `Composition`

Another approach is using Interface.

| interface DataReader |
| -------------------- |
| read(): void         |
| data: string[][]     |

We use this interface as a type for a properties in a class :

| class MatchReader  |
| ------------------ |
| reader: DataReader |
| load(): void       |

This class MatchReader will have a property called `reader` which the type is `DataReader` that contains both : `read(): void` and also `data: string[][]`

Then we can create other reader class like

| class APIReader | class CSVFileReader |
| --------------- | ------------------- |
| read(): void    | read(): void        |
| data: string[]  | data: string[]      |

These are separate class which we can instantiate in the property `reader` . So it’s like importing them.

So in the future we can create a custom class for any reader that we want.

Here’s the full code of composition :

- `CSVFileReader.ts`

  ```tsx
  import fs from 'fs';

  export class CSVFileReader {
    data: string[][] = [];

    constructor(public filePath: string) {}

    read(): void {
      this.data = fs
        .readFileSync(this.filePath, {
          encoding: 'utf-8',
        })
        .split('\n')
        .map((element: string): string[] => {
          return element.split(',');
        });
    }
  }
  ```

- `MatchReader.ts`

  ```tsx
  import { MatchType } from './TypesThisProject';
  import { dateStringToDate } from './utils';
  import { MATCH_RESULT } from './TypesThisProject';

  interface DataReader {
    read(): void;
    data: string[][];
  }

  export class MatchReader {
    matches: MatchType[] = [];
    constructor(public reader: DataReader) {
      this.load();
    }

    load(): void {
      this.reader.read();
      this.mapRow();
    }

    protected mapRow(): void {
      this.reader.data.forEach((row: string[]) => {
        this.pushDataToArray(row);
      });
    }

    protected pushDataToArray(row: string[]): void {
      this.matches.push(this.splitStringAndParseToDataType(row));
    }

    protected splitStringAndParseToDataType(row: string[]): MatchType {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MATCH_RESULT,
        row[6],
      ];
    }
  }
  ```

## `Inheritance` Vs `Composition`

| Inheritance                                                                                                                                                              | Composition                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Involves creating a new class that is a modified version of an existing class, (a class derives properties and behaviour from a parent class and add more functionality) | Involves creating a new class that is composed of objects from other classes. |
| is a relationship between two classes                                                                                                                                    | has a relationship between two classes                                        |

Here’s the full visio diagram about it:

[https://1drv.ms/u/s!AiZUfaWsJp6thI4SCokUabiMEs7UEQ?e=d6Bnkx](https://1drv.ms/u/s!AiZUfaWsJp6thI4SCokUabiMEs7UEQ?e=d6Bnkx)

## Misconception about Composition

> “Favor object composition over class inheritance”
> Design Patterns, pg20

However the book was written for C++.

Using `Object.assign()` is not a composition. It is a multiple Inheritance!

## Breakdown the analyzer.

The previous we create a reader both using Inheritance and also composition.

And in the `index.ts` we create a funtion like this :

```tsx
import { MatchReader } from './MatchReader';
import path from 'path';
import { MatchType } from './TypesThisProject';
import { WinCountReturnType } from './TypesThisProject';
import { MATCH_RESULT } from './TypesThisProject';
import { CSVFileReader } from './CSVFileReader';

function generateMatchesArray(): MatchType[] {
  const CSV_PATH = path.join(__dirname, '..', 'data', 'football.csv');
  const matches = new MatchReader(new CSVFileReader(CSV_PATH));

  console.log(matches.matches[0][0]);
  console.log(matches.matches[0][1]);
  console.log(matches.matches[0][2]);
  console.log(matches.matches[0][3]);
  console.log(matches.matches[0][4]);
  console.log(matches.matches[0][5]);
  console.log(matches.matches[0][6]);
  return matches.matches;
}

function winCount(matchesArray: MatchType[], club: string): WinCountReturnType {
  let totalGame = 0;
  let totalHomeGame = 0;
  let totalAwayGame = 0;
  let homeWin = 0;
  let awayWin = 0;
  let totalWin = 0;
  let homeLose = 0;
  let awayLose = 0;
  let totalLose = 0;

  matchesArray.forEach((element) => {
    if (element[1] === club) {
      totalHomeGame++;
    }

    if (element[2] === club) {
      totalAwayGame++;
    }

    if (element[1] === club && element[5] === MATCH_RESULT.HOME_WIN) {
      homeWin++;
    }

    if (element[2] === club && element[5] === MATCH_RESULT.AWAY_WIN) {
      awayWin++;
    }
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
    totalLose,
  };
}

function test(): void {
  let horrayVariable = 'Okay';
  horrayVariable = 'Kimak';
  horrayVariable = 'Fuck';
  console.log(horrayVariable);
}

(function main(): void {
  const matchesArray = generateMatchesArray();
  const manUnitedWin = winCount(matchesArray, 'Man United');
  console.table(manUnitedWin);
})();
```

We’re going to create several class like this: (But I think I’ll modify it) :

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5f6e53dd-9740-44c2-9dd0-8e1de29bd500/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230327T111057Z&X-Amz-Expires=86400&X-Amz-Signature=d6d28480230e6f104af10b86ed3cc3c4a05611aa75578e6281c802241b916248&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

Here’s the final code :

- `index.ts`

  ```tsx
  import { MatchReader } from './MatchReader';
  import path from 'path';
  import { CSVFileReader } from './CSVFileReader';
  import { StatisticAnalyzer } from './StatisticAnalyzer';

  (function main(): void {
    const CSV_PATH = path.join(__dirname, '..', 'data', 'football.csv');
    const matches = new MatchReader(new CSVFileReader(CSV_PATH));

    const matchesArray = matches.matches;
    const manUnitedStatistics = new StatisticAnalyzer(
      matchesArray,
      'Man United'
    );

    manUnitedStatistics.printReport();
  })();
  ```

- `MatchReader.ts`

  ```tsx
  import { MatchType } from './TypesThisProject';
  import { dateStringToDate } from './utils';
  import { MATCH_RESULT } from './TypesThisProject';

  interface DataReader {
    read(): void;
    data: string[][];
    filePath: string;
  }

  export class MatchReader {
    matches: MatchType[] = [];
    constructor(protected reader: DataReader) {
      this.load();
    }

    private load(): void {
      this.reader.read();
      this.mapRow();
    }

    protected mapRow(): void {
      this.reader.data.forEach((row: string[]) => {
        this.pushDataToArray(row);
      });
    }

    protected pushDataToArray(row: string[]): void {
      this.matches.push(this.splitStringAndParseToDataType(row));
    }

    protected splitStringAndParseToDataType(row: string[]): MatchType {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MATCH_RESULT,
        row[6],
      ];
    }

    get readerData() {
      const { filePath, data } = this.reader;

      return {
        filePath,
        data,
      };
    }
  }
  ```

- `CSVFileReader.ts`

  ```tsx
  import fs from 'fs';

  export class CSVFileReader {
    data: string[][] = [];

    constructor(public filePath: string) {}

    read(): void {
      this.data = fs
        .readFileSync(this.filePath, {
          encoding: 'utf-8',
        })
        .split('\n')
        .map((element: string): string[] => {
          return element.split(',');
        });
    }
  }
  ```

- `StatisticAnalyzer.ts`

  ```tsx
  import { MatchType } from './TypesThisProject';
  import { WinCountReturnType } from './TypesThisProject';
  import { MATCH_RESULT } from './TypesThisProject';

  export class StatisticAnalyzer {
    private totalGame = 0;
    private totalHomeGame = 0;
    private totalAwayGame = 0;
    private homeWin = 0;
    private awayWin = 0;
    private totalWin = 0;
    private homeLose = 0;
    private awayLose = 0;
    private totalLose = 0;
    private totalGoalHome = 0;
    private totalGoalAway = 0;
    private totalGoal = 0;

    constructor(private matchesArray: MatchType[], private club: string) {
      this.analyze();
    }

    private analyze(): void {
      this.matchesArray.forEach((element) => {
        if (element[1] === this.club) {
          this.totalHomeGame++;
          this.totalGoalHome += element[3];
        }

        if (element[2] === this.club) {
          this.totalAwayGame++;
          this.totalGoalAway += element[4];
        }

        if (element[1] === this.club && element[5] === MATCH_RESULT.HOME_WIN) {
          this.homeWin++;
        }

        if (element[2] === this.club && element[5] === MATCH_RESULT.AWAY_WIN) {
          this.awayWin++;
        }
      });

      this.totalWin = this.homeWin + this.awayWin;
      this.totalGame = this.totalHomeGame + this.totalAwayGame;
      this.homeLose = this.totalHomeGame - this.homeWin;
      this.awayLose = this.totalAwayGame - this.awayWin;
      this.totalLose = this.homeLose + this.awayLose;
      this.totalGoal = this.totalGoalHome + this.totalGoalAway;
    }

    get statistics(): WinCountReturnType {
      const {
        totalGame,
        totalHomeGame,
        totalAwayGame,
        homeWin,
        awayWin,
        totalWin,
        homeLose,
        awayLose,
        totalLose,
        totalGoalHome,
        totalGoalAway,
        totalGoal,
      } = this;

      return {
        totalGame,
        totalHomeGame,
        totalAwayGame,
        homeWin,
        awayWin,
        totalWin,
        homeLose,
        awayLose,
        totalLose,
        totalGoalHome,
        totalGoalAway,
        totalGoal,
      };
    }

    printReport() {
      console.table(this.statistics);
    }
  }
  ```
