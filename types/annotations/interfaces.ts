

interface Reportable {
  summary(): string
}

const oldPhone = {
  name: 'Old Iphone',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name : ${this.name}`
  }
}

const drink2 = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`
  }
}

const printRepot = (item: Reportable ): void => { 
  console.log(item.summary());
}

printRepot(oldPhone);
printRepot(drink2);




