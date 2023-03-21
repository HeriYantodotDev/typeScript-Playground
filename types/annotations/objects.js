"use strict";
//annotations around objects
const profile = {
    name: 'alex',
    age: 20,
    coords: {
        lat: 0,
        lng: 15
    },
    setAge(age) {
        this.age = age;
    }
};
const { age, name: profileName } = profile;
const { coords: { lat, lng } } = profile;
