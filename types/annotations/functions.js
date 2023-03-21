"use strict";
//Type Inference
const add = (a, b) => {
    return a + b;
};
function add3(a, b) {
    return a + b;
}
//Type Annotations
const add2 = (a, b) => {
    return String(a + b);
};
const subtract = (a, b) => {
    return a - b;
};
//void
const logger = (message) => {
    console.log(message);
    return undefined;
};
const error = (message) => {
    throw new Error(message);
};
//destructuring
const todaysWeather = {
    date: new Date(),
    weather: 'sunny'
};
const logWeather = ({ date, weather }) => {
    console.log(date);
    console.log(weather);
};
logWeather(todaysWeather);
