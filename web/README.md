# Web Framework

## Environment

- As usual, we’re going to use parce.
    - `npx parcel index.html`
    - Create an index.html and also a ts file.

## Framework Structure

We will have two classes: 

- Model Classes
    - handle data, used to represent Users, Blog Posts, Images, etc
- View Classes
    - Handle HTML and events caused by the user (like clicks)

How it looks like this : 

- Name & age
- a form to update name with the button `Update name`
- a button to set random age
- and a save button.

so based the information we can jot down several things like : 

- Probably need to create a class to represent a User and all of its data (like name and age)
- User class needs to have the ability to store some data, retrive it, and change it
- also needs to have the ability to notify the rest of the app when some data is changed
- User needs to be able to persists data to an ouside server, and then retrieve it at some future point.

The general idea is like this ( Extraction Approach) 

- Build class User as a ‘mega’ class with tons of methods
- Refactor User to use composition
- Refactor User to be a reusable class that can represent any piece of data, not just a User

### class User design

| class User |  |
| --- | --- |
| private data: UserProps |  |
| get(probName: string): (string | number| |  |
| set(update: UserProps): void |  |
| on(evenName: string, callback: () ⇒ {})  |  |
| trigger(evenName: string): void |  |
| fetch(): Promise |  |
| save(): Promise |  |

## Class User

- Now create a new folder named `model.ts`
- inside it we create a file named `User.ts`
- the code for the field `data` , also:  `get` and `set` methods.
    
    ```tsx
    interface UserProps {
      [key: string]: string | number | undefined;
      name?: string,
      age?: number
    }
    
    export class User {
      constructor(private data: UserProps){}
    
      get(propName: string): (string | number | undefined) {
        return this.data[propName]
      }
    
      set(update: UserProps): void {
        Object.assign(this.data, update);
      }
    }
    ```
    
- eventing style
    - We’re watching for a specific event to occur, and whenever that event occurs, the function is executed
    - We named it `on` method. and then `trigger` method which contains the callback function.
        - 
        
        ```tsx
        type Callback = () => void;
        
        on(eventName: string, callback: Callback) {
            
          }
        ```
        
    - Storing Events
        - Here’s the code :
            
            ```tsx
            interface UserProps {
              [key: string]: string | number | undefined;
              name?: string,
              age?: number
            };
            
            type Callback = () => void;
            
            export class User {
              events: {[key: string]: Callback[]} = {};
            
              constructor(private data: UserProps){};
            
              get(propName: string): (string | number | undefined) {
                return this.data[propName]
              };
            
              set(update: UserProps): void {
                Object.assign(this.data, update);
              };
            
              on(eventName: string, callback: Callback): void {
                const handlers = this.events[eventName] || [];
                handlers.push(callback);
                this.events[eventName] = handlers;
              };
            
            };
            ```
            
        - Here’s how we try to add event and the callback funciton in the `index.ts`
            
            ```tsx
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
            ```
            
        - and here’s the result :
            
            ```tsx
            ()=>{
                console.log("click2");
            }
            
            User {data: {…}, events: {…}}
            data
            : 
            {name: 'John', age: 20}
            events
            : 
            change
            : 
            [ƒ]
            click
            : 
            Array(2)
            0
            : 
            ()=>{ console.log("click"); }
            1
            : 
            ()=>{ console.log("click2"); }
            length
            : 
            2
            [[Prototype]]
            : 
            Array(0)
            [[Prototype]]
            : 
            Object
            [[Prototype]]
            : 
            Object
            
            ```
            
- `trigger` method
    - trigger method is the method to trigger the callback or all the callback :
    - Here’s the code :
        
        ```tsx
        interface UserProps {
          [key: string]: string | number | undefined;
          name?: string,
          age?: number
        };
        
        type Callback = () => void;
        
        export class User {
          events: {[key: string]: Callback[]} = {};
        
          constructor(private data: UserProps){};
        
          get(propName: string): (string | number | undefined) {
            return this.data[propName]
          };
        
          set(update: UserProps): void {
            Object.assign(this.data, update);
          };
        
          on(eventName: string, callback: Callback): void {
            const handlers = this.events[eventName] || [];
            handlers.push(callback);
            this.events[eventName] = handlers;
          };
        
          trigger(eventName: string): void {
            const handlers = this.events[eventName];
        
            if (!handlers || handlers.length === 0 ) {
              return;
            };
        
            handlers.forEach(callback => {
              callback();
            });
          };
        };
        ```
        
    - Here’s when we tried it
        
        ```tsx
        import { User } from "./model/User";
        
        const user = new User ({name: 'John', age: 20});
        
        user.on('change', () => {
          console.log('change 1')
        });
        
        user.on('click', () => {
          console.log('click1');
        });
        
        user.on('click', () => {
          console.log('click2');
        });
        
        user.trigger('asdfasdf'); // nothing will happen, the function return
        
        user.trigger('click');
        user.trigger('change');
        ```
        
    - and here’s the result:
        
        ```tsx
        click1
        click2
         change 1
        ```
        

## JSON Server

- Adding JSON server
    - Third Party server.
        - It’s a quick server set up for development environment.
        - It could store information in JSON.
    - `npm install -g json-server`
    - Now create a file in the root server `db.json`
        - jot down this code :
            
            ```tsx
            {
              "users": []
            }
            ```
            
    - then back to the terminal : `json-server -w db.json`
        - Now it’s going to run the server :
            
            ```tsx
            \{^_^}/ hi!
            
              Loading db.json
              Done
            
              Resources
              http://localhost:3000/users
            
              Home
              http://localhost:3000
            ```
            
    - Then let’s install axios : `npm install axios`
    - Dont’ forget to create a script in the `package.json` so you can run it quickly:
        - 
        
        ```tsx
        "scripts": {
            "start:db": "json-server -w db.json",
            "start:parcel": "npx parcel index.html"
          }
        ```
        

- Restful convention in the JSON server
    
    
    | GET | /post |
    | --- | --- |
    | GET | /posts/:id |
    | POST | /posts |
    | PUT | /posts/:id |
    | DELETE | /posts/:id |
- Here’s the example of using it.
    - in the `index.ts` :
        
        ```tsx
        import axios from 'axios';
        import { AxiosResponse } from 'axios';
        
        const SERVER_URL = 'http://localhost:3000/users'
        
        function postNewUser(name: string, age: number): void {
          axios.post(SERVER_URL, {
            name: "Yoda",
            age: 40
          });
        }
        
        interface TypeUser {
          name: string,
          age: number,
          id: number
        }
        
        async function getUserID(params: string): Promise<TypeUser> {
          const result: AxiosResponse<TypeUser> = await axios.get(`${SERVER_URL}/${Number(params)}`);
          return result.data;
        }
        
        async function main(): Promise<void> {
          console.log( await getUserID('1'));
          console.log( await getUserID('2'));
          console.log( await getUserID('3'));
          console.log( await getUserID('8'));
          console.log( await getUserID('14'));
        }
        
        main();
        ```
        
    - In the example above we now that has a function to add new user, and also we can get a specific data like above. then the information will be stored in the `db.json` . Awesome isn’t it ?

## Fetch and Save method

- We’re creating `fetch()` function to get the data from json-server.
- asdf
- asdf

Here’s the code :

```tsx
import axios from "axios";
import { AxiosResponse } from "axios";

interface UserProps {
  [key: string]: string | number | undefined;
  id?: number;
  name?: string,
  age?: number
};

type Callback = () => void;

export class User {
  private SERVER_URL: string = 'http://localhost:3000/users';

  events: {[key: string]: Callback[]} = {};

  constructor(private data: UserProps){};

  get(propName: string): (string | number | undefined) {
    return this.data[propName]
  };

  set(update: UserProps): void {
    Object.assign(this.data, update);
  };

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0 ) {
      return;
    };

    handlers.forEach(callback => {
      callback();
    });
  };

  async fetch(): Promise<void> {
    await this.getUserId();
  }

  async getUserId(): Promise<void> {
    const respond: AxiosResponse<UserProps> = await axios.get(`${this.SERVER_URL}/${this.get('id')}`);
    this.set(respond.data);
  }

  async save(): Promise<void> {
    const id = this.get('id');
    if (id) {
      await this.putUserData(id);
    } else {
      await this.postUserData();
    }
  }

  async putUserData(id: number | string): Promise<void> {
    await axios.put(`${this.SERVER_URL}/${id}`, this.data);
  }

  async postUserData(): Promise<void> {
    await axios.post(this.SERVER_URL, this.data);
  }

};
```

## Refactor User to use composition

We’re going to separate this functionality into several classes: 

- User class needs to have the ability to store some data, retrieve it and change it
- Ability to notify the rest of the app when some data is changed
- to persist data to an outside server, and then retrieve it at some future point.

So it looks like this : 

| class User |
| --- |
| attributes: Attributes |
| events: Events |
| sync: Sync |

This time we’re going to use composition with nested object

### Eventing refactoring

- First extract the all of the eventing method into a separate class and file - `Eventing.ts`
    
    ```tsx
    type Callback = () => void;
    
    export class Eventing {
      events: {[key: string]: Callback[]} = {};
    
      on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
      };
    
      trigger(eventName: string): void {
        const handlers = this.events[eventName];
    
        if (!handlers || handlers.length === 0 ) {
          return;
        };
    
        handlers.forEach(callback => {
          callback();
        });
      };
    
    }
    ```
    
- Second now we connect it using Composition with Nested Objects
    
    ```tsx
    import { Eventing } from "./Eventing";
    
    import axios from "axios";
    import { AxiosResponse } from "axios";
    import { Eventing } from "./Eventing";
    
    interface UserProps {
      [key: string]: string | number | undefined;
      id?: number;
      name?: string,
      age?: number
    };
    
    export class User {
      private SERVER_URL: string = 'http://localhost:3000/users';
    
      public events: Eventing = new Eventing();
    
      constructor(private data: UserProps){};
    
    //.. and the rest the same
    ```
    

### Sycn Refactoring

This is quite tricky since the method `save` and `fetch` using filed `data` in the `User` class.

There are several possible options here: 

1. Sync gets function arguments
    1. For example: `save(id: number, data: UserProps)` 
    2. The problem is  that now the class `Sync` only works for `User` class. Therefore class `Sync` becomes not reusable. 
2. Serialize and Deserialize 
    1. Serialize ⇒ Change the object into some savable format like JSON 
    2. Deserialize ⇒ change the previous format into JSON. 
    3. example:
        1.  `save(id: number, serialize: Serializable): void` 
        2. `fetch(id: number, deserialize: Deserializable): void` 
    4. then we define two interface  `Serializable` and `Deserializable` 
    5. 
3. Sync is a generic class to customize the type of ‘data’ coming into save() 
    1. `save(id: num, data:T): AxiosPromise<T>` 
    2. `fetch(id: num): AxiosPromise<T>` 
    3. in the `User` class we have a filed named `sync` like this `sync: Sync<UserProps>` 

We’re going to move with option number 3. 

So here’s how it looks like : 

- Pay attention than in this Sync class , previously we modify the object within the class, this time , we will return the promise.
- 

```tsx
import axios, {AxiosResponse, AxiosPromise} from "axios";

interface HasId {
  id?: number
}

export class Sync<T extends HasId> {

  constructor(public rootURL: string ){}

  async fetch(id: number): AxiosPromise {
    return this.getUserId(id);
  };

  private async getUserId(id: number): AxiosPromise {
    return await axios.get(`${this.rootURL}/${id}`);
  };

  async save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      const response = await this.putUserData(id, data);
      return response;
    } 
    
    const response = await this.postUserData(data);
    return response;
  };

  private async putUserData(id: number | string, data: T): AxiosPromise {
    const response = await axios.put(`${this.rootURL}/${id}`, data);
    return response;
    //TO DO: setting the current instance with the ID
  };

  private async postUserData(data: T): AxiosPromise {
    const response = await axios.post(this.rootURL, data);
    return response;
    //TO DO: setting the current instance with the ID
  };
}
```

Now in the `User.ts` we create a field where we create an instance of the Sync class there : 

```tsx
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  [key: string]: string | number | undefined;
  id?: number;
  name?: string,
  age?: number
};

export class User {

  private SERVER_URL: string = 'http://localhost:3000/users';
  
  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(this.SERVER_URL);

};
```

### Attributes Refactoring

Previously we declare the properties within the `User.ts` . This time , we’re going to create a separate class named `Attributes` where in this class contains the field `data` and also the `get` and  `set`. 

so ,here’s the code in the `Attributes.ts` 

```tsx
export class Attributes<T extends {}> {
  constructor(private data: T){};

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key]
  };

  set(update: T): void {
    Object.assign(this.data, update);
  };
}
```

Then let’s integrate it in the `User.ts` : 

Please notice that the way we initialize it quite different, since we need to take an argument to initialize this class. 

```tsx
export interface UserProps {
  [key: string]: string | number | undefined;
  id?: number;
  name?: string,
  age?: number
};

export class User {

  private SERVER_URL: string = 'http://localhost:3000/users';
  
  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(this.SERVER_URL);

  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  } 

};
```

## The problem with the previous refactoring.

The problem with the refactoring above is that we have to call another field that contains object from separated class. for example `User.sync.save()` .

This leads to unclear and confusing when we want to use the method. 

> Remember: When we use composition, the idea of implementing composition is delegation. 
We don’t want a `caller` to reach out through for example other class `instances`.
> 

So here’s the idea. the class `User` will have this properties : 

| class User |
| --- |
| get() |
| set() |
| on() |
| trigger() |
| fetch() |
| save() |

And this caller function will call the instance of other class. 

> be careful with this. 
`this` always refer to the left. 
For example `User.on` , if in the `.on` we are calling `this` , the `this` refers to the `User`. 
The problem is that if we do a restructuring, then it will become a problem. 
to solve this issue we can use arrow function to ensure that `this` always refer to the current block function. As a bound function.
> 

Arrow Functions:

- **`this`** is lexically bound, meaning that its value is determined by the surrounding context where the arrow function is defined, rather than the context where it is executed.
- **`this`** does not have its own binding in arrow functions, and instead uses the value of **`this`** from the surrounding lexical scope.
- Arrow functions are useful for maintaining the scope of **`this`** from the surrounding context, and for creating concise and readable code.

Function Declarations:

- **`this`** is dynamically bound, meaning that its value is determined by how the function is called at runtime.
- **`this`** has its own binding in function declarations, and is set to the object that called the function, or the global object if no object is specified.
- Function declarations are useful for accessing **`this`** dynamically and for using the **`arguments`** object or **`super`** keyword.

example: 

```tsx
get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  };

//instead of 

get <K extends keyof T>(key: K): T[K] {
    return this.data[key]
  };
```

### Additional features on set()

In `set()` we’d like to add features to radiate information when we change something in the attributes. 

## Integrate All of it

Let’s break it down and assemble them in the `Model.ts` , then using inheritance the class `User.ts` enherits from `Model.ts` 

Here’s the code : 

- `Attributes.ts`
    
    ```tsx
    export class Attributes<T extends {}> {
      constructor(private data: T){};
    
      get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key]
      };
    
      set = (update: T): void => {
        Object.assign(this.data, update);
      };
    
      getAllData = (): T => {
        return this.data
      }
      
    }
    ```
    
- `Eventing.ts`
    
    ```tsx
    export type Callback = () => void;
    
    export class Eventing {
      events: {[key: string]: Callback[]} = {};
    
      on = (eventName: string, callback: Callback): void => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
      };
    
      trigger = (eventName: string): void => {
        const handlers = this.events[eventName];
    
        if (!handlers || handlers.length === 0 ) {
          return;
        };
    
        handlers.forEach(callback => {
          callback();
        });
      };
    
    }
    ```
    
- `ApiSync.ts`
    
    ```tsx
    import axios, {AxiosResponse, AxiosPromise} from "axios";
    
    interface HasId {
      id?: number
    }
    
    export class ApiSync<T extends HasId> {
    
      constructor(public rootURL: string ){}
    
      async fetch(id: number): AxiosPromise {
        return this.getUserId(id);
      };
    
      private async getUserId(id: number): AxiosPromise {
        return await axios.get(`${this.rootURL}/${id}`);
      };
    
      async save(data: T): AxiosPromise {
        const { id } = data;
        if (id) {
          const response = await this.putUserData(id, data);
          return response;
        } 
        
        const response = await this.postUserData(data);
        return response;
      };
    
      private async putUserData(id: number | string, data: T): AxiosPromise {
        const response = await axios.put(`${this.rootURL}/${id}`, data);
        return response;
        //TO DO: setting the current instance with the ID
      };
    
      private async postUserData(data: T): AxiosPromise {
        const response = await axios.post(this.rootURL, data);
        return response;
        //TO DO: setting the current instance with the ID
      };
    }
    ```
    
- `Model.ts`
    
    ```tsx
    import { Callback } from "./Eventing";
    import { AxiosPromise, AxiosResponse } from "axios";
    
    interface ModelAttributes<T> {
      set(value: T): void,
      getAllData(): T,
      get<K extends keyof T>(key: K): T[K]
    }
    
    interface Sync<T> {
      fetch(id: number): AxiosPromise,
      save(data:T): AxiosPromise
    }
    
    interface Events {
      on(eventName: string , callback:Callback): void,
      trigger(eventName: string): void
    }
    
    interface HasId {
      id?: number;
    }
    
    export class Model<T extends HasId> {
      constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
      ) {}
    
      on = this.events.on;
      // get on () {
      //   return this.events.on;
      // };
    
      trigger = this.events.trigger;
      // get trigger() {
      //   return this.events.trigger;
      // };
    
      get = this.attributes.get;
      // get get() {
      //   return this.attributes.get;
      // }
    
      getAllData = this.attributes.getAllData;
      // get getAllData() {
      //   return this.attributes.getAllData;
      // }
    
      set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
      }
    
      async fetch(): Promise<void> {
        const id = this.get('id');
    
        if (typeof id !== 'number') {
          throw new Error('Cannot fetch without an id');
        }
    
        const response = await this.sync.fetch(id);
        this.set(response.data);
      }
    
      async save(): Promise<void> {
        try {
          const response: AxiosResponse<T> = (await this.sync.save(this.attributes.getAllData()));
          this.trigger('save');
          this.set(response.data);
        }
        catch(err) {
          this.trigger('error');
        };
      };
    
    }
    ```
    
- `User.ts`
    
    ```tsx
    import { Eventing } from "./Eventing";
    import { ApiSync } from "./ApiSync";
    import { Attributes } from "./Attributes";
    import { Model } from "./Model";
    
    export interface UserProps {
      [key: string]: string | number | undefined;
      id?: number;
      name?: string,
      age?: number
    };
    
    const SERVER_URL: string = 'http://localhost:3000/users';
    
    export class User extends Model<UserProps> {
    
      static buildUser(attrs: UserProps): User {
        return new User(
          new Attributes<UserProps>(attrs),
          new Eventing(),
          new ApiSync<UserProps>(SERVER_URL)
          );
      }
    
    };
    ```
    
- Now we can test it in the `index.ts`
    
    ```tsx
    import { User } from "./model/User";
    
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
    
    async function main() {
      testingGet();
      testingSet();
      await testingFetch();
      await testingSave();
      await testingSaveExistingID();
    };
    
    main();
    ```
    

## Collection class

Now, we have to add a new class in order to populer all of the user. or all of the collection in a database. 

| class Collection |
| --- |
| models: T[] |
| events: Eventing |
| fetch() |

> There’s a function to create a function to create a new object. here’s how :
> 

```tsx
public deserialize: (json: K) => T 
```

and here’s how to call it 

```tsx
deserialize(value)
```

So we can pass dynamic argument , and the function is to create new object based on it. 

> But remember we must have a static class to create a class.
> 

and here’s the implementation: 

```tsx
const collection = new Collection<User, UserProps>(
    'http://localhost:3000/users', 
    (json: UserProps) => User.buildUser(json));
```

- `Collection.ts`
    
    ```tsx
    import { Eventing } from "./Eventing";
    import axios from "axios";
    
    export class Collection<T, K> {
      models: T[] = [];
      events: Eventing = new Eventing();
      
      constructor(
        public rootURL: string,
        public deserialize: (json: K) => T
        ){}
    
      get on() {
        return this.events.on;
      }
    
      get trigger() {
        return this.events.trigger;
      }
    
      async fetch(): Promise<void> {
        const response = await axios.get(this.rootURL);
        const data: K[] = await response.data;
        for (const value of data) {
          this.models.push(this.deserialize(value));
        }
        this.trigger('change');
      }
    }
    ```
    
- `User.ts` ⇒ we create a static class here, so for every User instance we can create a collection class
    
    ```tsx
    import { Eventing } from "./Eventing";
    import { ApiSync } from "./ApiSync";
    import { Attributes } from "./Attributes";
    import { Model } from "./Model";
    import { Collection } from "./Collection";
    
    export interface UserProps {
      [key: string]: string | number | undefined;
      id?: number;
      name?: string,
      age?: number
    };
    
    const SERVER_URL: string = 'http://localhost:3000/users';
    
    export class User extends Model<UserProps> {
    
      static buildUser(attrs: UserProps): User {
        return new User(
          new Attributes<UserProps>(attrs),
          new Eventing(),
          new ApiSync<UserProps>(SERVER_URL)
          );
      }
    
      static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
          SERVER_URL, 
          (json: UserProps) => User.buildUser(json));
      }
    };
    ```
    

Ok then we’re done . 

## View class

We’re creating three class : 

- UserEdit
- UserShow
- UserForm

So, here’s what we’re going to do : 

- Implemenet `UserForm`
- Extract reusable logic from it and use that to build `UserShow` and `UserEdit`

### class UserForm

| class UserForm |
| --- |
| parent: Element |
| template(): string |
| render(): void |

So here’s the Rendering Timeline:

- Call `render` method
- Render calls `template`, gets HTML string
- Render inserts HTML string into a template element
- We should somehow bind even handlers to the HTML in there
- Render inserts content of template into DOM

some functionality: 

- And we have to define the `eventsMap()` too. (I’ll skip about this, and will note the final class for `UserForm`.
- Print user.  We want the UserForm has the ability to print out the user’s name and age.
- Take new input from the browser and update the model. Add event, and trigger the event when edit the model.

### Reusable code

| class UserForm |  |
| --- | --- |
| parent: Element |  |
| model: User |  |
| template(): string |  |
| render(): void | Reusable ⇒ class HtmlRenderer |
| eventsMap(): {key: ()⇒ void } |  |
| bindEvents(): void |  |
| bindModel(): void |  |
| onSetNameClick(): void |  |
| onSetAgeClick(): void |  |

The best way for refactoring this is to use Inheritance. We don’t have to create all composition thing. 

| Child | Parent - Abstract |
| --- | --- |
| class UserForm | abstract class View |
| template(): string | parent: Element |
| eventsMap(): { Key: () ⇒ void} | model: User |
| onSetNameClick(): void | render(): void |
| onSetAgeClick(): void | bindEvents(): void |
|  | bindModel(): void |
|  | abstract template(): string |
|  | abstract eventsMap(): { key: () ⇒ void } |
|  |  |

Then we also need to modify `UserForm` template a little bit and create another class. 

### UserShow and UserEdit

`UserShow` This is to show the data. 

`UserEdit` is where we’re going to nesting several objects. 

- `UserEdit.ts`
    
    ```tsx
    import { View } from "./View";
    import { User, UserProps } from "../model/User";
    import { UserForm } from "./UserForm";
    import { UserShow } from "./UserShow";
    
    export class UserEdit extends View<User, UserProps> {
      
      regionsMap(): { [key: string]: string; } {
        return {
          userShow: '.user-show',
          userForm: '.user-form'
        }
      }
    
      onRender(): void {
        new UserShow(this.regions.userShow, this.model).render();
        new UserForm(this.regions.userForm, this.model).render();
      }
      
      template(): string {
        return `
          <div>
            <div class = "user-show"></div>
            <div class = "user-form"></div>
          </div>
        `
      }
    }
    ```
    
- `UserForm.ts`
    
    ```tsx
    import { User, UserProps } from "../model/User";
    
    import { View } from "./View";
    
    export class UserForm extends View<User, UserProps> {
    
      eventsMap(): {[key: string]: () => void} {
        return {
          'click:.set-age': this.onSetAgeClick,
          'click:.set-name': this.onSetNameClick,
          'click:.save-model': this.onSaveClick
        };
      };
    
      onSaveClick = async (): Promise<void> => {
        await this.model.save();
      }
      onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');
    
        if (!input) {
          throw new Error('Input Element is not found');
        };
    
        const name = input.value;
    
        if (!name) {
          return;
        };
    
        this.model.set({name});
      };
    
      onSetAgeClick = (): void => {
        this.model.setRandomAge();
      };
    
      template(): string {
        return `
          <div>
            <input placeholder="${this.model.get('name')}"/> 
            <button class="set-name">Change name </button>
            <button class="set-age">Set Random Age</button>
            <button class="save-model">Save User </button>
          </div>
        `
      };
    
    };
    ```
    
- `UserList.ts`
    
    ```tsx
    import { CollectionView } from "./CollectionView";
    import { User, UserProps } from "../model/User";
    import { UserShow } from "./UserShow";
    
    export class UserList extends CollectionView<User, UserProps> {
      renderItem(model: User, itemParent: Element): void {
        new UserShow(itemParent, model).render();
      };
    
    }
    ```
    
- `UserShow.ts`
    
    ```tsx
    import { View } from "./View";
    import { User, UserProps } from "../model/User";
    
    export class UserShow extends View<User, UserProps> {
      template(): string {
          return `
          <div>
          <h1>User Detail</h1>
          <div>User Name: ${this.model.get('name')}</div>
          <div>User Age: ${this.model.get('age')}</div>
          </div>
          `;
      }
    }
    ```
    
- `View.ts`
    
    ```tsx
    import { Model } from "../model/Model";
    
    import { HasId } from "../model/Model";
    
    export abstract class View<T extends Model<K>, K extends HasId> {
      regions: { [key: string]: Element} = {};
    
      constructor (public parent: Element, public model: T) {
        this.bindModel();
      };
    
      eventsMap(): {[key: string]: () => void} {
        return {}
      }
    
      abstract template(): string;
    
      regionsMap(): {[key: string]: string} {
        return {};
      }
    
      bindModel(): void {
        this.model.on('change', () => {
          this.render();
        });
      }
    
      bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
          const [eventName, selector] = eventKey.split(':');
          fragment.querySelectorAll(selector).forEach(element => {
            element.addEventListener(eventName, eventsMap[eventKey]);
          }
          );
        };
      };
    
      mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();
    
        for (let key in regionsMap) {
          const selector = regionsMap[key];
    
          const element = fragment.querySelector(selector);
    
          if (!element) {
            continue;
          }
          this.regions[key] = element;
        }
      }
    
      onRender(): void {
      }
    
      render(): void {
        this.parent.innerHTML = "";
        
        const templateElement = document.createElement('template');
    
        templateElement.innerHTML = this.template();
        
        this.bindEvents(templateElement.content);
    
        this.mapRegions(templateElement.content);
    
        this.onRender();
    
        this.parent.append(templateElement.content);
      };
    
    };
    ```
    
- `CollectionView.ts`
    
    ```tsx
    import { Collection } from "../model/Collection";
    
    export abstract class CollectionView<T, K> {
      constructor(public parent: Element, public collection: Collection<T, K>) {};
    
      abstract renderItem(model: T, itemParent: Element): void;
    
      render(): void {
        this.parent.innerHTML = '';
        const templateElement = document.createElement('template');
    
        for (let model of this.collection.models) {
          const itemParent = document.createElement('div');
          this.renderItem(model, itemParent);
          templateElement.content.append(itemParent);
        }
    
        this.parent.append(templateElement.content);
      }
    }
    ```
    
-