class ArrayParent<T>{
  constructor (public collection: T[]){}

  get(index: number): T {
    return this.collection[index]
  }
}

const test1 = new ArrayParent([5,7,7]);


function printStrings(arr: string[]): void {
  for (let i=0; i < arr.length; i++) {
    console.log(i)
  }
}

function printNumbers(arr: number[]): void {
  for (let i=0; i < arr.length; i++) {
    console.log(i)
  }
}

function printArray<T>(arr: T[]): void {
  for (let i=0; i < arr.length; i++) {
    console.log(arr[i]);  
  }
}

printArray<number>([4,3,2]);
printArray([4,3,2]);


class Car2 {
  print() {
    console.log('I am a car');
  }
}

class House {
  print() {
    console.log('I am a house');
  }
}

interface Printable {
  print(): void;
}

function printHousesOrCars<T extends Printable>(arr: T[]) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}






