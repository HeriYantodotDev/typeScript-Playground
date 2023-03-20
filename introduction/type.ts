//boolean
let isCool: boolean = true;

//number
let age: number = 56;

//string
let oke = 'whata';
let eyeColor: string = 'brown';
let favoriteQuote: string = `I'm not old, I'm only ${age}`;

//array
let pets: string[] = ['cat', 'dog', 'pig'];

let pets2: Array<string> = ['lion', 'dragon', 'lizard'];

//object
let wizard: object = {
    a: 'john'
}

//Tuple
let basket: [string, number];
basket = ['basketball', 5];

//Enum
enum Size { Small = 1, Medium = 2, Large = 3};
let sizeName: string = Size[2];
let sizeNumber: number = Size.Small;
console.log(sizeName); //Medium
console.log(sizeNumber); //1

// Any
let whatever: any = 'asdfadsf';
whatever = 14;
whatever = ['wu ha'];

//void
let sing = (): void => {
    console.log('lalla')
}
let song = (): string => {
    console.log('lalla')
    return 'lala';
}

//never
function error(message: string): never {
    console.log('Error')
    throw new Error(message);
  }


interface RobotArmy {
    count: number,
    type: string,
    magic: string
}
//interface
let fightRobotArmy = (robots: {count: number, type: string, magic: string}) => {
    console.log('Fight');
}

let fightRobotArmy2 = (robots: RobotArmy) => {
    console.log('Fight');
}

// Type Assertion
interface dogArmy {
    count: number,
    type: string,
    magic?: string
}

let dog = {} as dogArmy;

// function 

let fightRobotArmy3 = (robots: RobotArmy): void => {
    console.log('Fight');
}

let fightRobotArmy4 = (robots: RobotArmy): number => {
    console.log('Fight');
    return 5;
}

// class
class Animal {
    private sing: string = 'Default Value';
    public song: string = 'askdhf';
    constructor(sound: string) {
        this.sing = sound;
    }

    greet(): string {
      return `Hello ${this.sing}`;
    }
}

let lion = new Animal('RAAAARRH');
console.log(lion.greet());

// union
let confused: string | number | boolean;
confused = 'oke';
confused = 4;
confused = true;

//null and undefined
let meh: undefined = undefined;
let noo: null = null;