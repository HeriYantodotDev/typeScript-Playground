import { MatchReader } from './MatchReader';
import path from 'path';
import { MatchType } from './TypesThisProject';
import { WinCountReturnType } from './TypesThisProject';
import { MATCH_RESULT } from './TypesThisProject';
import { CSVFileReader } from './CSVFileReader';

function generateMatchesArray(): MatchType[]{
  const CSV_PATH = path.join(__dirname,'..','data','football.csv');
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

function statisticAnalyzer(matchesArray: MatchType[], club: string): WinCountReturnType {
  
  let totalGame = 0;
  let totalHomeGame = 0;
  let totalAwayGame = 0;
  let homeWin = 0;
  let awayWin = 0;
  let totalWin = 0;
  let homeLose = 0;
  let awayLose = 0;
  let totalLose = 0;
  let totalGoalHome = 0;
  let totalGoalAway = 0;

  
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


function test(): void {
  let horrayVariable = 'Okay';
  horrayVariable = 'Kimak';
  horrayVariable = 'Fuck';
  console.log(horrayVariable)
}

(function main(): void {
  
  const matchesArray = generateMatchesArray();
  const manUnitedWin = statisticAnalyzer(matchesArray,'Man United');
  console.table(manUnitedWin)
})();
