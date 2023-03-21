const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
}

//tuple example
let pepsi: [string, boolean, number] = ['brown', true, 40];

// console.log(pepsi[0] = 56) // this is an error. 


//type alias for tuple
type Drink = [string, boolean, number];

let cocaCola: Drink;

// Tuple is not really useful since we don't know what it is. 
// Please compare these two types: 

const carSpecs: [number, number] = [400, 3356];

const catSpecs2 = {
  horsePower: 400,
  weight: 3354
}

