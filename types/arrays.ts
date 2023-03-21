const bigTechs = ['Microsoft', 'Google', 'Apple', 'Facebook'];

let vegetables: string[];

let dates: Array<string>;

const movies = [
  ['Sherlock Holmes'],
  ['Enola Holmes'],
  ['Titanic']
]

let people: string[][];

let food: Array<Array<string>>;

// Help with inference when extracting values
// We can now hover to the variable, and we can know the type 
const techCompany = bigTechs[0];
const removedCompany = bigTechs.pop();

// Preven incompatible values - Eerror will pop up.
// bigTechs.push(1000);


// Help with array built in function and the type auto-complete.

bigTechs.map((company) => {
  return company
})

// Flexible types - example below : => const importantDates: (string | Date)[]
const importantDates = [new Date(), '2020-10-10']

let crucialDates: (Date | string)[] = [];





