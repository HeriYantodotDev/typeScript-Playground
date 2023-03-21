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

## Tuples Types

> Tuple ⇒ Array-like structure where each element represents some property of a record

For example we have an array like this :

```tsx
const pepsi = ['brown', true, 40];
```

When we hover it :

`const pepsi: (string | number | boolean)[]`

So TS will inference that the type is a combination of string, number, and boolean, and the order is not important. this could be a problem since in a `tuple` we want then in a specific order.

So we use type annotation like this for `tuple` data type:

```tsx
let pepsi: [string, boolean, number] = ['brown', true, 40];

console.log((pepsi[0] = 56)); // => this will be an error.
```

In the example above, TS will throw an error :

```tsx
let pepsi: [string, boolean, number]
Type 'number' is not assignable to type 'string'.ts(2322)
```

Ts will now know the order of the type.

We can also use Type alias to make our life easier :

```tsx
//type alias for tuple
type Drink = [string, boolean, number];

let cocaCola: Drink;
```

However we’re not going to use tuple very often. Since it’s lack of clarity.

It’s better we use Object :

```tsx
// Tuple is not really useful since we don't know what it is.
// Please compare these two types:

const carSpecs: [number, number] = [400, 3356];

const catSpecs2 = {
  horsePower: 400,
  weight: 3354,
};
```

## Interface

> Interfaces + Classes = How we get really strong code reuse in TS

Interface creates a new type (custom type), describing the property names and value types of an object.

Let’s take a code below:

```tsx
//Take a look below, it's difficult to read. The parameters are too long.

const oldPhone = {
  name: 'Old Iphone',
  year: 2012,
  broken: true,
};

const printPhone = (vehicle: {
  name: string;
  year: number;
  broken: boolean;
}) => {
  console.log(`Name : ${vehicle.name}`);
  console.log(`Year : ${vehicle.year}`);
  console.log(`Name : ${vehicle.broken}`);
};

printPhone(oldPhone);
```

The code above works perfectly fine, but it has a problem, the parameters are too long.

Let’s fix it using `interface`

```tsx
interface Phone {
  name: string;
  year: number;
  broken: boolean;
}

const oldPhone = {
  name: 'Old Iphone',
  year: 2012,
  broken: true,
};

const printPhone = (vehicle: Phone) => {
  console.log(`Name : ${vehicle.name}`);
  console.log(`Year : ${vehicle.year}`);
  console.log(`Name : ${vehicle.broken}`);
};

printPhone(oldPhone);
```

We can also use customer types like function in the interface. The example below is the example of using a function type:

```tsx
interface Phone {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldPhone = {
  name: 'Old Iphone',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name : ${this.name}`;
  },
};

const printPhone = (phone: Phone) => {
  console.log(phone.summary());
};

printPhone(oldPhone);
```

Code Reuse with interfaces:

- Please take a look at the code below.
- We can write a reusable code.
- When we pass an object, TS will check whether the object contains the properties that defined in the interface. This will make our code useable.

```tsx
interface Reportable {
  summary(): string;
}

const oldPhone = {
  name: 'Old Iphone',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name : ${this.name}`;
  },
};

const drink2 = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  },
};

const printRepot = (item: Reportable): void => {
  console.log(item.summary());
};

printRepot(oldPhone);
printRepot(drink2);
```

Here’s the general strategy for Reusable Code in TS:

- Create functions that accept arguments that are typed with interfaces.
- Object/classes can decide to implement a given interface to work with a function.

## Class

> Class ⇒ a blueprint to create an object with some fields (values) and methods (functions) to represent a ‘thing’

Here’s the example of using class:

```tsx
class Vehicle {
  drive(): void {
    console.log('brumm');
  }

  honk(): void {
    console.log('bip bip');
  }
}

const vehicle = new Vehicle();

vehicle.drive();
vehicle.honk();
```

Basic Inheritance: This is the example of basic inheritance :

```tsx
class Vehicle {
  drive(): void {
    console.log('brumm');
  }

  honk(): void {
    console.log('beep beep');
  }
}

class MotorCycle extends Vehicle {
  //overriding the existing class
  drive(): void {
    console.log('The motorcyle is running!!!');
  }
}

const motor = new MotorCycle();

motor.drive();
motor.honk();
```

In TypeScript there are something called modified :

- public :
  - This method can be called anywhere, any time
- private.
  - This method can only be called by other methods in this class
- protected
  - This method can be called by other methods in this class, or by other methods in child classes.

Code example:

```tsx
class Vehicle {
  public drive(): void {
    console.log('brumm');
  }

  //We can only use private in this class only
  private sound(): void {
    console.log('Jrenggg!!!');
  }

  //We can use this in this class and in the child class
  //But we can't use this in the instance.
  protected honk(): void {
    console.log('beep beep');
  }
}

class MotorCycle extends Vehicle {
  //overriding the existing class
  public drive(): void {
    console.log('The motorcyle is running!!!');
  }

  //we can use this in this child class
  protected honk(): void {}
}

const motor = new MotorCycle();

motor.drive();
```

Now let’s talk about field or data : modifiers, constructors, and also inheritance :

```tsx
class Vehicle {
  // color: string;
  // constructor(color: string = 'no no color'){
  //   this.color = color;
  // }

  // or we can just use like this
  constructor(public color: string = 'no no color') {}

  public drive(): void {
    console.log('brumm');
  }

  //We can only use private in this class only
  private sound(): void {
    console.log('Jrenggg!!!');
  }

  //We can use this in this class and in the child class
  //But we can't use this in the instance.
  protected honk(): void {
    console.log('beep beep');
  }
}

class MotorCycle extends Vehicle {
  constructor(public wheels: number = 2, public color: string) {
    super(color);
  }

  //overriding the existing class
  public drive(): void {
    console.log('The motorcyle is running!!!');
  }

  //we can use this in this child class
  protected honk(): void {}
}

const motor = new MotorCycle(2, 'red');
console.log(motor.color);
motor.drive();

const newCar = new Vehicle('orange');
console.log(newCar.color);

const newCar2 = new MotorCycle(3, 'red');
console.log(newCar2.color);
```

When we use this?

> Interfaces + Classes = how we get really strong code reuse in TS
