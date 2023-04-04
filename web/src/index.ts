import {User} from "./model/User";
import { UserForm } from "./view/UserForm";
import { UserEdit } from "./view/UserEdit";
import { UserList } from "./view/UserList";
import { Collection } from "./model/Collection";
import { UserProps } from "./model/User";

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
};

function testUserForm() {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found');
  };

  const user = User.buildUser({
    name : "Heri Yanto",
    age: 35
  })

  const userForm = new UserForm(rootElement, user);

  userForm.render();
};

function testUserEdit() {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found');
  };

  const user = User.buildUser({
    name : "Heri Yanto",
    age: 35
  })

  const userEdit = new UserEdit(rootElement, user);

  userEdit.render();

  console.log(userEdit);
};


async function main() {
  // testingGet();
  // testingSet();
  // await testingFetch();
  // await testingSave();
  // await testingSaveExistingID();
  // await testAxios();
  // testUserForm();
  // testUserEdit();
};

main();