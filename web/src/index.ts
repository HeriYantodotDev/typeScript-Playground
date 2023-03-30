import { User } from "../model/User";

const user = new User ({name: 'John', age: 20});

user.on('change', () => {

});

user.on('click', () => {
  console.log('click');
});

user.on('click', () => {
  console.log('click2');
});

console.log(user.events['click'][1]);
console.log(user);
