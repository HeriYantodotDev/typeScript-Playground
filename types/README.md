# Type

> Type ⇒ Easy way to refer to the different properties + functions that a value has.

For example what is `"red"` :

- It’s a string
- It is a value that has all the properties + functions / methods that we assume that a string has.

Example:

| Type    | Values that Have this type               |
| ------- | ---------------------------------------- |
| string  | 'hi there’ , “”, “Today”                 |
| number  | .00 , -20, 40000                         |
| boolean | true, false                              |
| Date    | new Date()                               |
| Todo    | {id: 1, completed: true, title: “Trash”} |

There are two main Types in JavaScript:

| Primitive Types | Object Types |
| --------------- | ------------ |
| number          | functions    |
| boolean         | arrays       |
| symbol          | classes      |
| string          | objects      |
| void            |              |
| undefined       |              |
| null            |              |

Why do we care about Types:

1. Types are used by TS compiler to analyze errors
2. Documentation? It allows developers to understand what values are flowing around our codebase.

## Type Annotations & Inference

> Type annotations : Code we add to tell TS what type of value a variable will refer to

> Type inference: TS tries to figure out what type of value a variable refers to

| Type Annotations            | Type Inference      |
| --------------------------- | ------------------- |
| Developers tell TS the type | TS guesses the type |

Example of type annotations:

⇒ Pay attention on the Object literal. Instead of `,` we put `;` there.

```tsx
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

let myNumbers: number[] = [1, 2, 3];
myNumbers = [5, 6, 7];

//Classes

class Car {}

let car: Car = new Car();

//object literal

let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

// Function
// we can use both of thid
const logNumber = (i: number): void => {
  console.log(i);
};

const logNumber2: (i: number) => void = (i: number) => {
  console.log(i);
};
```

> Code above, if there’s a value for the variable, we don’t have to use `Type annotations`

> If declaration and initialization are on the same line, TS will figure out the type of variable for us. So we don’t have to add the type.

When we’re going to use Type annotations or Type inference?

| Type annotations                                                                    | Type Inference |
| ----------------------------------------------------------------------------------- | -------------- |
| When we declare a variable then initialize it later                                 | Always         |
| When we want a variable to have type that can’t be inferred, like a specific object |                |
| When a function returns the ‘any’ type and we need to clarify the value             |                |

For Example : `JSON.parse()`

this function will return several different types even though that the input is only string :

| Input              | Output          |
| ------------------ | --------------- |
| 'false’            | boolean         |
| '4’                | number          |
| ‘{”value”: 5}’     | {value: number} |
| '{”name”: “alex”}’ | {name: string}  |

```tsx
//When to use annotations
// 1) Function that returns the 'any` type

const json = '{"x": 10, "y": 20}';
const coordinates = JSON.parse(json);
console.log(coordinates);
```

> **We have to avoid variables with ‘any’ at all costs**

So we have to specify it :

```tsx
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);
```

Next example when we have to use `type annotations`

We use type annotations in the variable `foundWord` .

```
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}
```

Next example for when inference doesn’t work :

```tsx
let numbers = [-10, -1, 12];

let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
```

## Annotations with Functions and Objects
