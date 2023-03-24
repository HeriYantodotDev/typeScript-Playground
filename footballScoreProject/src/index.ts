import fs from 'fs';
import path from 'path';

function readCSVData(path: string): string {
  return fs.readFileSync(path, {
    encoding: 'utf-8'
  });
};

function parseStringtoArrayString2D(data: string): string[][] {
  return data
  .split('\n')
  .map((row: string): string[] => {
    return row.split(',');
  });
};

function generateListScore(): string[][]{
  const CSV_PATH = path.join(__dirname,'..','data','football.csv');
  const matches = readCSVData(CSV_PATH);
  return parseStringtoArrayString2D(matches);
};

interface winCountReturnType {
  homeWin: number,
  awayWin: number,
  totalWin: number,
  homeLose: number,
  awayLose: number,
  totalHomeGame: number,
  totalAwayGame: number, 
  totalGame: number,
  totalLose: number
};

function winCount(matchesArray: string[][], club: string): winCountReturnType {

  enum MATCH_RESULT {
    HOME_WIN = 'H',
    AWAY_WIN = 'A',
    DRAW = 'D'
  }
  
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
    };

    if (element[2] === club) {
      totalAwayGame++;
    };

    if (element[1] === club && element[5] === MATCH_RESULT.HOME_WIN)  {
      homeWin++;
    };
    
    if (element[2] === club && element[5] === MATCH_RESULT.AWAY_WIN) {
      awayWin++
    };


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
  }

};

function main(): void {
  const matchesArray = generateListScore();
  const manUnitedWin = winCount(matchesArray,'Man United');
  console.table(manUnitedWin)
}

main();