import { MatchReader } from './MatchReader';
import path from 'path';
import { CSVFileReader } from './CSVFileReader';
import { StatisticAnalyzer } from './StatisticAnalyzer';


(function main(): void {
  const CSV_PATH = path.join(__dirname,'..','data','football.csv');
  const matches = new MatchReader(new CSVFileReader(CSV_PATH));
  
  const matchesArray = matches.matches;
  const manUnitedStatistics = new StatisticAnalyzer(matchesArray,'Man United');

  manUnitedStatistics.printReport();
})();