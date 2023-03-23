# Project: Sorting Array - String - Linked List

[Notion Link](https://www.notion.so/TypeScript-The-Complete-Developer-s-Guide-ba9582b22711462e862ffb314603e482?pvs=4#888152c233ca4700ab7405f17a6de437)

## Setting Up TS Complier

- Creating two folder :
  - `src` and `build`
  - src contains ts file
  - build contains js file
- Then we create `tsconfig.json` file by `tsc --init`
- Then in the `tsconfig.json` we enable this option :
  - `"outDir": "./build",`
  - `"rootDir": "./src", /* Specify the root folder within your source files. */`
- This will telling us to compile all TS file in the `rootDir` and put it in the `outDir`
- Now we can use `tsc --watch` to compile it automatically.
- We can use Nodemon to automatically run the process.
  - `npm init -y`
  - `npm install nodemon --save-dev`
    - Re run node
  - `npm install concurrently --save-dev`
    - run several script simultaneously
- Now in the package.json add this scrirpt
  - it could run every script that has `start:`
  ```tsx
  "start:build": "tsc -w",
  "start:run": "nodemon build/index.js",
  "start": "concurrently npm:start:*"
  ```

## Bubble Sort

- compare two item, and swap the element.
- After the first iteration the element on the edge right is guarantee the biggest
- then we iterate the remanding

> This is just for a learning propose.

## Type Guard

for example we accepting an argument of type union like this :

```tsx
constructor(collection: number[] | string) {
    this.collection = collection;
  }
```

That means TS will limit the argument to only can use the intersection method or properties between those type.

Let’s say we would like to use the method and properties in the type `number[]` we can use like this :

```tsx
private bubbleSortAlgorith(length: number): void {
    for (let i=0; i < length; i ++) {
      for (let j=0; j< length - i - 1; j++) {

        //if collection is an array of Number
        if (this.collection instanceof Array) {
          if (this.collection[j] > this.collection[j+1]) {
            const leftHand = this.collection[j];
            this.collection[j] = this.collection[j+1];
            this.collection[j+1] = leftHand;
          }
        }
        //if collection is a string, do this logic:

      }
    }
  }
```

So within the if statement `this.collection instanceof Array` . It allows all of the method and properties withing the Array type.

It’s a string type that we want to check then like this:

```tsx
if (typeof this.collection === 'string') {
}
```

So here’s the guidelines for the Type Guard:

- We use `typeof` to a primitive type : `number`, `string`, `boolean` `symbol`
- We use `instanceof` to every other value that is created with a constructor function.

After we use type Guard Ts will restore the method and properties for the type.

> However this is not a good approach because it’s not scalable. For example we we’d like to use a new type, then we will type every implementation for each type.

## Extract Key Logic

We can create a class for example :

- Sorter.ts
- NumbersCollection
- CharactersCollection.ts
- LinkedList.ts

so we’re going to create a class named `Sorter.ts` . this is a class to sort several data type : number, string, and also linkedList.

`Sorter.ts` will take an argument and an argument could be a number, string or linkedList.

How?

> the best way to do this is to create an interface which has the same properties for each data type.
> Then we’re going to create class which represents number: string and also linked list.

| Sorter.ts | NumbersCollection.ts | CharactersCollection.ts | LinkedList.ts |
| --------- | -------------------- | ----------------------- | ------------- |

| class Sorter {
sort() {

}

Takes an argument
which the argument
has :

interface

swap(i,j)
compare(i,j)
length
| swap(i,j)
compare(i,j)
length | swap(i,j)
compare(i,j)
length | swap(i,j)
compare(i,j)
length |

### Define Interface

This is how we define the interface:

```tsx
interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}

export class Sorter {
  constructor(public collection: Sortable) {}

  sort(): void {
    const { length } = this.collection;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          this.collection.swap(j, j + 1);
        }
      }
    }
  }
}
```

### Inherintance

The class `Sorter` before is the parent class, and `NumbersCollection`, `CharactersCollection`, and `LinkedList` are the child class.

In this way we don’t have to create a Sorter instance all the time.

| Sorter.ts | NumbersCollection.ts | CharactersCollection.ts | LinkedList.ts |
| --------- | -------------------- | ----------------------- | ------------- |

| class Sorter {
sort() {

}

Takes an argument
which the argument
has :

interface

swap(i,j)
compare(i,j)
length

and
sort()
| swap(i,j)
compare(i,j)
length

inherit: sort() | swap(i,j)
compare(i,j)
length

inherit: sort() | swap(i,j)
compare(i,j)
length

inherit: sort() |

> If the child class doesn’t declare constructor then we don’t have to call `super()`. Since it’s already automatically added.

### Abstract Class

- Can’t be use to create an instance.
- Can only be use as a parent class.
- can contain real implementation for some codes
- The implemented methods can refer to other methods that don’t actually exist yet ( We still have to provide names and types for the un-implemented methods)
- can make child classes promise to implement some other method

Here’s how it looks like :

```tsx
export abstract class Sorter {
  abstract length: number;
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;

  sort(): void {
    const { length } = this;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
```

### Interfaces vs Inheritance/Abstract Classes

| Interfaces                                                            | Inheritance/Abstract Classes                                 |
| --------------------------------------------------------------------- | ------------------------------------------------------------ |
| Sets up a contract between different classes                          | Sets up a contract between different classes                 |
| Use when we have very different objects that we want to work together | Use when we are trying to build up a definition of an object |
| Promotes loose coupling                                               | Strongly couples classes together                            |

### Implementation for each class

Now we have several classes, we’re going to write down the implementation.

## Getter & Setter

If we’d like to access a function like a property, then we can use the keyword `get` like this :

```tsx
export class NumberCollection {
  constructor(public data: number[]) {}

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex];
    this.data[leftIndex] = this.data[rightIndex];
    this.data[rightIndex] = leftHand;
  }
}

const collection = new NumberCollection([1, 2, 3]);

collection.length;
```

So, right now we can access `length()` just like a property. `.length`
