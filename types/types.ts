const today = new Date();
today.getMonth();

const person = {
  age: 20
}

class Color {
  name = "no color";

  constructor(name: string) {
    this.name = name;
  }

}

const red = new Color('blue');

console.log(red.name);

