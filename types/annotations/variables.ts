//Type Annotations
let apples: number = 5;

let speed: string = 'fast';

let hasName: boolean = true;

let nothingMuch: null = null;

let nothing: undefined = undefined;

// built in objects

let now: Date = new Date();

//array

let colors: string[]; 
colors = ['red', 'blue', 'green'];

let animals: Array<string>;
animals = ['Elephant', 'Tiger'];

let myNumbers: number[] = [1,2,3];
myNumbers = [5,6,7];

//Classes

class Car {

}

let car: Car = new Car();

//object literal 

let point: { x: number; y: number  } = {
  x: 10,
  y: 20
};

// Function 
// we can use both of thid
const logNumber = (i: number): void => {
  console.log(i);
}

const logNumber2: (i: number) => void = (i: number) => {
  console.log(i);
}


//When to use annotations 
// 1) Function that returns the 'any` type 

const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number} = JSON.parse(json);
console.log(coordinates);


//2) 

let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  } 
}

//Variable whose type cannot be inferred correctly 

let numbers = [-10, -1, 12];

let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i ++ ) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}


