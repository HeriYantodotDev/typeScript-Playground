import {User} from "./model/User";

function testingGet() {
  const user = User.buildUser({
    name: 'new record', 
    age: 0
  });

  console.log(user.get('name'));


};

function testingSet() {
  const user = User.buildUser({
    name: 'new record', 
    age: 0
  });

  user.on('change', () => {
    console.log('This is change');
  });

  user.set({
    name: 'New name'
  })

};

async function testingFetch(){
  const user = User.buildUser({
    id: 1
  });

  user.on('change', () => {
    console.log(user);
  });

  await user.fetch();
};

async function testingSave() {
  const user = User.buildUser({
    name: "New One safsdfsadf",
    age: 1000
  })

  await user.save();

  console.log(user.getAllData());
};

async function testingSaveExistingID() {
  const user = User.buildUser({
    id: 1,
    name: "hjkl;",
    age: 1000
  })

  user.on('save', () => {
    console.log(user);
  });

  user

  await user.save();
};

async function testAxios() {
  const collection = User.buildUserCollection();

  collection.on('change', () => {
    console.log(collection);
  })

  collection.fetch();
}

async function main() {
  // testingGet();
  // testingSet();
  // await testingFetch();
  // await testingSave();
  // await testingSaveExistingID();
  await testAxios();

};

main();