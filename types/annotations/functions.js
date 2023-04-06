"use strict";
//Type Inference
var add = function (a, b) {
    return a + b;
};
function add3(a, b) {
    return a + b;
}
//Type Annotations
var add2 = function (a, b) {
    return String(a + b);
};
var subtract = function (a, b) {
    return a - b;
};
//void
var logger = function (message) {
    console.log(message);
    return undefined;
};
var error = function (message) {
    throw new Error(message);
};
//destructuring
var todaysWeather = {
    date: new Date(),
    weather: 'sunny'
};
var logWeather = function (_a) {
    var date = _a.date, weather = _a.weather;
    console.log(date);
    console.log(weather);
};
logWeather(todaysWeather);
