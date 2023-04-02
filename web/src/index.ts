import { User } from "./model/User";

// async function testingFetch(): Promise<void> {
//   const user = new User ({id: 1});
//   await user.fetch();
//   console.log(user.get('id'));
//   console.log(user.get('name'));
//   console.log(user.get('age'));
// };

// async function testingSaveWithID(): Promise<void> {
//   const user = new User ({id: 1});
//   await user.fetch();
//   user.set({
//     name: 'OKAY2s',
//     age: 1000,
//   });
//   user.save();
// };

// async function testingSaveNoId(): Promise<void> {

//   const user = new User({});
//   user.set({
//     name: "NEW",
//     age: 999
//   });

//   await user.save();
//   await user.fetch();
//   console.log(user.get('id'));
//   console.log(user.get('name'));
//   console.log(user.get('age'));

// };

// function testRefactoringEvenWithCompositionWithNestedObjects(): void {
//   const user = new User({name: 'new record', age: 0});
//   user.events.on('change', () => {
//     console.log('change');
//   })

//   user.events.on('click', () => {
//     console.log('click');
//   })

//   user.events.trigger('change');
//   user.events.trigger('click');

// };

function testNewRefactoring() {
  const user = new User({
    name: 'new record', 
    age: 0
  });

};

async function main() {
  // await testingFetch();
  // await testingSaveWithID();
  // await testingSaveNoId();
  // testRefactoringEvenWithCompositionWithNestedObjects();
  // testNewRefactoring();
};

main();