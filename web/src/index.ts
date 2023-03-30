import { User } from "../model/User";

const user = new User ({name: 'John', age: 20});

console.log(user.get('name'));
console.log(user.get('age'));

user.set({name: 'Sheldon'});

console.log(user.get('name'));
console.log(user.get('age'));

user.set({age: 100});

console.log(user.get('name'));
console.log(user.get('age'));
