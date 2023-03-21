//Type Inference
const add = (a: number, b: number) => {
  return a+b
}

function add3 (a:number, b:number) {
  return a + b
}

//Type Annotations
const add2 = (a: number, b: number):string => {
  return String(a+b)
}

const subtract = (a: number, b: number): number => {
  return a - b
}

//void

const logger = (message : string): void => {
  console.log(message);
  return undefined
}

const error = (message: string): never => {
  throw new Error(message);
}

//destructuring

const todaysWeather = {
  date: new Date(),
  weather: 'sunny'
}

const logWeather = ({date, weather}: {date: Date, weather: string}): void => {
  console.log(date);
  console.log(weather);
}

logWeather(todaysWeather);

