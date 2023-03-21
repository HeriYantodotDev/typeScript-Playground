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

Two types annotations for functions :

- Type annotations for functions
  - Code we add to tell TypeScript what type of arguments a function will receive and what type of values it will return
- Type inference for functions
  - TypeScript tries to figure out what type of value a function will return

> **Remember! For function we always want to use Type annotations**

For example : In code below TS will guess (Type inference for function) what is the type of the return value.

```tsx
const add = (a: number, b: number) => {
  return a + b;
};
```

In this case we use Type annotations for functions. we want the return value type to be string, we do not convert it to string then it would be an error because TypeScript knows that `a+b` type is a number.

```tsx
const add2 = (a: number, b: number): string => {
  return String(a + b);
};
```

> But remember! we should always put the type of what we’d like to return to avoid confusion. Whether we’d like to return something or just void

Looks at the example below:

```tsx
const subtract = (a: number, b: number) => {
  a - b;
};
```

In this below example, TS will guess this function will return void or not returning anything. It won’t catch any error. Therefore we have to specify the return type for the function so it could catch error.

`A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.ts(2847)`

Another example for void & never

Void is not returning anything. But it could return undefined.

```tsx
const logger = (message: string): void => {
  console.log(message);
  return undefined;
};
```

For never. It’s type that will never reach to the end of the function.

```tsx
const error = (message: string): never => {
  throw new Error(message);
};
```

Destructuring. This is how we destructure the arguments.

```tsx
//destructuring

const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);
```

Annotations around object:

```tsx
//annotations around objects
const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

const { age, name: profileName }: { age: number; name: string } = profile;
const {
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;
```

## Array Types

- Several ways to work with Array Types:
  ```tsx
  const bigTechs = ['Microsoft', 'Google', 'Apple', 'Facebook'];

  let vegetables: string[];

  let dates: Array<string>;
  ```
- 2D array :
  ```tsx
  const movies = [['Sherlock Holmes'], ['Enola Holmes'], ['Titanic']];

  let people: string[][];

  let food: Array<Array<string>>;
  ```
- Help with inference when extracting values :
  - We can now hover to the variable and we can know the type
  ```tsx
  const techCompany = bigTechs[0];
  const removedCompany = bigTechs.pop();
  ```
- Prevent incompatible values
  - Error will pop up if we put the incompatible values :
    ```tsx
    bigTechs.push(1000);
    //Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
    ```
- Help with array built in function and the type auto complete. Our IDE will give us insight about this.
  ```tsx
  bigTechs.map((company) => {
    return company;
  });
  ```
- Flexible types
  ```tsx
  const importantDates = [new Date(), '2020-10-10'];

  let crucialDates: (Date | string)[] = [];
  ```
