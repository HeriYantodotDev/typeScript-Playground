"use strict";
var bigTechs = ['Microsoft', 'Google', 'Apple', 'Facebook'];
var vegetables;
var dates;
var movies = [
    ['Sherlock Holmes'],
    ['Enola Holmes'],
    ['Titanic']
];
var people;
var food;
// Help with inference when extracting values
// We can now hover to the variable, and we can know the type 
var techCompany = bigTechs[0];
var removedCompany = bigTechs.pop();
// Preven incompatible values - Eerror will pop up.
// bigTechs.push(1000);
// Help with array built in function and the type auto-complete.
bigTechs.map(function (company) {
    return company;
});
// Flexible types - example below : => const importantDates: (string | Date)[]
var importantDates = [new Date(), '2020-10-10'];
var crucialDates = [];
