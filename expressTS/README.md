# Express + TypeScript

When it comes to use Libraries there are three ways to do this :

- Use it as usual and add TS ;
- Using libraries to adjust it with TS;
- Just do your own implementation for TS with TS classes.

So here’s the project :

- Root route ⇒ tells the user whether it’s login or not. Then a link to login
- then a login page /`/login`
- Then after login back to home page. then informs the user that they’re login and there’s a link that they are logout
- There’s a `/protected` route, if login they can see information in it. If they are not login then there are messages to show deny

## Project set up

- `npm init -y`
- `tsc --init`
  - set up in the `tsconfig.json` :
    - `"outDir": "./build"`
    - `"rootDir": "./src"`
- `npm install concurrently`
- Then in the script :
  - `"start:build": "tsc -w"`
  - `“start:run”: “nodemon build/index.js”`
  - `"start" : "concurrently npm:start:*"`
- install express
  - `npm install express`
  - `npm install @types/express`
- install cookie-session:
  - `npm install cookie-session`
  - `npm install @types/cookie-session`
- asdf

Ok. Now let’s get into the important one. You know that we use middleware to parse the response.

```tsx
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
```

- Problem Number one : Now TS doesn’t have any idea what the properties etc after the response of the middleware. Middleware in general is hard to deal with in TS. why?
  > (req,res,next) ⇒ Middleware ⇒ Middleware does some processing of Request and Response ⇒ Call next function when complete.
  If the middleware is in JS, this is really difficult for TS to figure out
- Problem Number two: We use the type definition file, and they don’t tell us the whole story. For example `req.body` . This won’t show any error. However if we don’t use any body parser then `.body` won’t exist.
- EXACERBATED BY THE TYPE DEFINITION FILE: Problem Number three: All program that takes outside input are not guaranteed to have the correct properties or type
-

## Dealing with Poor Type Def

How? Extends the existing type file.

```tsx
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
```

> By doing this we are forced to do type guard to ensure whether the value of the exist or not.

This is really important, to take advantage of TypeScript.

Ok here’s a simple Express Application with bare minimum TS type check :

- `loginRoutes.ts`
  -
  ```tsx
  import { Router, Response, Request, NextFunction } from 'express';

  interface RequestWithBody extends Request {
    body: {
      [key: string]: string | undefined;
    };
  }

  function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
      next();
      return;
    } else {
      res.status(403).send(`
        Sorry! You have to log in first!!!
      `);
      return;
    }
  }

  const router = Router();
  router.get('/login', (req: Request, res: Response) => {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name= "password" type="Password" />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  `);
  });

  router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send('Hey Input it correctly please!');
      return;
    }

    if (email !== 'test@gmail.com' && password !== '123') {
      res.send('Invalid email or password');
      return;
    }

    req.session = { loggedIn: true };
    res.redirect('/');
  });

  router.get('/', (req: Request, res: Response) => {
    if (!req.session) {
      return res.send(`
        <div>
          <div>You are logged Out</div>
          <a href="/login">Login</a>
        </div>
      `);
    }

    if (!req.session.loggedIn) {
      return res.send(`
        <div>
          <div>You are logged Out</div>
          <a href="/login">Login</a>
        </div>
      `);
    }

    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  });

  router.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
      req.session.loggedIn = false;
      res.redirect('/');
    }
  });

  router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send(`
      <h1>Welcome</h1>
      <p>This is protected route, you log in USER</p>
    `);
  });

  export { router };
  ```
- `index.ts`
  ```tsx
  import express, { Express, Request, Response } from 'express';
  import { router } from './routes/loginRoutes';
  import cookieSession = require('cookie-session');

  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cookieSession({ keys: ['asdfasdf'] }));

  app.use(router);

  app.listen(3000, () => {
    console.log('listening on port : 3000');
  });
  ```

## Refactor it into class

Just putting our code into a class without benefit is just wasting of time.

When integrate TS & Express to work together we must have the benefit :

- Get better type safety (Help TS do a better job of catching errors)
- Significantly enchange the developer experience.

## Decorator

We can use class + Decorator.

Before that let’s review several concepts here :

- Classes in JavaScript are ‘syntactic sugar’ over prototypal inheritance
  - For example we declare a class like this :
    -
    ```tsx
    class Boat {
      color = 'red';

      pilot() {
        console.log('swish');
      }
      float() {
        console.log('the boat is floating');
      }
    }
    ```
    - Then we create an instance of it
      ```tsx
      const boat = new Boat();
      ```
    - We can add new method directly. what?
      ```tsx
      Boat.prototype.sink = function () {
        console.log('boat is sinking');
      };
      ```
    - now we can call `sink` in the instance direcly. 😭
      ```tsx
      boat.sink();
      ```
    - We can directly modifty the class on the fly and it changes the behaviour of the instance directly.
- Decorator
  - Read about Decorators here:
    - [A Complete Guide to TypeScript Decorators | Disenchanted (mirone.me)](https://mirone.me/a-complete-guide-to-typescript-decorator/)
    - [TypeScript: Documentation - Decorators (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/decorators.html)
  - function that can be used to modify/change/anything different properties/methods in the class.
  - Not the same as JS decorators.
  - Used inside/on classes only
  - Key to understand: understanding the order in which decorators are ran are the key to understanding them.
  - Experimental
    - In order to use it, we have to enable :
      - These two things:
      ```tsx
      "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
      "emitDecoratorMetadata": true,
      ```
- Decorators on a property, method, accessor :
  - First argument is the `prototyle of the object` ;
  - Second argument is the key of the property/method/accessor on the object .
  - The third argument is property descriptor.
  - Decorators are applied when the code for this class is ran (not when an instance is created)
- Why decorators are useful?
  - Let’s discuss about property descriptor first.
- Property Descriptor
  - Part of ES5
    > is an object that is meant to configure properties on another object.
  -
  | writable     | boolean | whether or not this property can be changed                    |
  | ------------ | ------- | -------------------------------------------------------------- |
  | enumerable   | boolean | whether or not this property get looped over by a ‘for in’     |
  | value        |         | current value                                                  |
  | configurable | boolean | property definition can be changed and property can be deleted |
  - For example we run this :
    ```tsx
    const car = { make: 'honda', year: 2016 };

    Object.getOwnPropertyDescriptor(car, 'make');
    //{value: 'honda', writable: true, enumerable: true, configurable: true}

    //we can change it so for example it couldn't be changed.
    Object.defineProperty(car, 'make', { writable: false });

    Object.getOwnPropertyDescriptor(car, 'make');
    //{value: 'honda', writable: false, enumerable: true, configurable: true}

    //if we make changes :
    car.make = 'toyota';

    console.log(car);
    //properties make can't be changed
    //{make: 'honda', year: 2016}
    ```
- Ok now let’ back to decorator. We can take advantange off the `PropertyDescriptor` to ensure change the configuration of the properties or to do something like this :
  - In the code below we can see that when we run the method of an instance, we can override it. We can check whether it’s error or not then console log thing.
  ```tsx
  class Boat {
    color: string = 'red';

    get formattedColor(): string {
      return `This boat color is ${this.color}`;
    }

    @logError
    pilot(): void {
      throw new Error();
    }
  }

  function logError(target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    desc.value = function () {
      try {
        method();
      } catch (err) {
        console.log(`Oops .... ${err}`);
      }
    };
  }

  new Boat().pilot();
  ```
- Decorator factory
  - so we’re going to wrap the previous function into a function. and return it.
  - like this :
  ```tsx
  function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
      const method = desc.value;
      desc.value = function () {
        try {
          method();
        } catch (err) {
          console.log(errorMessage);
        }
      };
    };
  }
  ```
  - then we’re going to pass an argument, within the decorator : `@logError('Ooop.... it\'s sinking')`
  ```tsx
  class Boat {
    color: string = 'red';

    get formattedColor(): string {
      return `This boat color is ${this.color}`;
    }

    @logError("Ooop.... it's sinking")
    pilot(): void {
      throw new Error();
    }
  }

  function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
      const method = desc.value;
      desc.value = function () {
        try {
          method();
        } catch (err) {
          console.log(errorMessage);
        }
      };
    };
  }

  const boat = new Boat();
  boat.pilot();
  ```
- Decorator around properties.
  > Remember that decorator can’t have a direct access to property definition.
  - In this code : `console.log(target)` would be undefined .
  ```tsx
  class Boat {
    @testDecorator
    color: string = 'red';

    get formattedColor(): string {
      return `This boat color is ${this.color}`;
    }

    @logError("Ooop.... it's sinking!!! Help")
    pilot(): void {
      throw new Error();
    }
  }

  function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
      const method = desc.value;
      desc.value = function () {
        try {
          method();
        } catch (err) {
          console.log(errorMessage);
        }
      };
    };
  }

  function testDecorator(target: any, key: string) {
    console.log(target.color); //undefined
    console.log(target, key);
  }
  ```
- Decorator on accessor, parameter, and class . Here’s the example and the result in the comment
  ```tsx
  @classDecorator
  class Boat {
    @testDecorator
    color: string = 'red';

    @testDecorator
    get formattedColor(): string {
      return `This boat color is ${this.color}`;
    }

    @logError("Ooop.... it's sinking!!! Help")
    pilot(
      @parameterDecorator speed: string,
      @parameterDecorator live: boolean
    ): void {
      if (speed === 'fast') {
        console.log('swish');
      } else {
        console.log('nothing');
      }
    }
  }

  function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
      const method = desc.value;
      desc.value = function () {
        try {
          method();
        } catch (err) {
          console.log(errorMessage);
        }
      };
    };
  }

  function testDecorator(target: any, key: string) {
    console.log(key);
  }

  function parameterDecorator(target: any, key: string, index: number) {
    console.log(key, index);
  }

  function classDecorator(constructor: typeof Boat) {
    console.log(constructor);
  }

  //result
  // color
  // formattedColor
  // pilot 1
  // pilot 0
  // [Function: Boat]
  ```

## Fundamental Integrate Decorator with Express

The idea is that we have a function then we wrap it with a decorator to do like :

- Routers
- middleware for authentication,
- validate input,
- And also we can mark a class to be like a controller.

So here’s the plan :

- Node executes our code :
- class definition read in - decorators are executed
- decorators associate route configuration info with the method by using metadata
- all method decorators run
- class decorator of @controler runs last
- class decorators reads metadata from each method, adds complete route definitions to router .

What is metadata :

- Proposed feature to be added to JS (thus , JS)
- Snippets of into that can be tied to a method, property, or class definition. Any kind of object.
- can be used for super custom stuff
- TS will (optionally) provide type information as metadata.
- Read and written using the reflect-metadata package.

We use this package : [reflect-metadata - npm (npmjs.com)](https://www.npmjs.com/package/reflect-metadata)

- First we install this metadata :
  - ``npm install reflect-metadata`
- This is the example when we add metadata
  - code below using `defineMetadata` we define a metadata. and `getMetadata` to add that metadata.
  ```tsx
  import 'reflect-metadata';

  const planet = {
    color: 'red',
  };

  Reflect.defineMetadata('note', 'hi there', planet);

  const note = Reflect.getMetadata('note', planet);

  console.log(note);
  ```
- So Imange like this :
  - object `planet` only has `color` properties
  - The above code adding a metadata properties, which is hidden . And inside it we can add as many as possible.
  | Object plane |     |
  | ------------ | --- |
  | color        | red |
  | metadata     |     |
  | plane metadata |            |
  | -------------- | ---------- |
  | note           | 'hi there’ |
  | other          | 'other’    |
- Here’s the equivalent code for this :
  ```tsx
  const planet = {
    color: 'red',
  };

  // Attach metadata to the planet object using the "note" key and the "hi there" value
  Object.defineProperty(planet, '__metadata__', {
    value: { note: 'hi there' },
    enumerable: false,
  });

  // Retrieve the metadata using the "note" key
  const note = planet.__metadata__.note;

  console.log(note);
  ```
- We can also attach the property for example in the prooperty of planet. let’s say we want to add property into `color`
  -
  ```tsx
  import 'reflect-metadata';

  const planet = {
    color: 'red',
  };

  Reflect.defineMetadata('note', 'hi there', planet, 'color');

  const note = Reflect.getMetadata('note', planet, 'color');
  console.log(note);
  ```
- Now here’s the example to use metadata and also decorator to put some properties and then retrieve it back:
  ```tsx
  import 'reflect-metadata';

  class Cat {
    color: string = 'green';

    @markFunction('Hello World')
    sound(): void {
      console.log('meaw meaw');
    }
  }

  function markFunction(secretInfo: string) {
    return function (target: Cat, key: string) {
      Reflect.defineMetadata('secret', secretInfo, target, key);
    };
  }

  const secret = Reflect.getMetadata('secret', Cat.prototype, 'sound');

  console.log(secret);
  ```
- now this the example to use metadata and decorator in a class :
  ```tsx
  import 'reflect-metadata';

  @printMetaData
  class Cat {
    color: string = 'green';

    @markFunction('Hello World')
    sound(): void {
      console.log('meaw meaw');
    }
  }

  function markFunction(secretInfo: string) {
    return function (target: Cat, key: string) {
      Reflect.defineMetadata('secret', secretInfo, target, key);
    };
  }

  //this is how we apply to constractor class
  function printMetaData(target: typeof Cat) {
    for (let key in target.prototype) {
      const secret = Reflect.getMetadata('secret', target.prototype, key);
      console.log(secret); //this is going to run it at the first time the class is read
    }
  }
  ```

## Implement Decorator + Metadata in Express

Here’s how we implement it:

The detail implementation for target language to “ES6”.

[snippet-library/Express-TS-Decorator-Example at main · HeriYantodotDev/snippet-library (github.com)](https://github.com/HeriYantodotDev/snippet-library/tree/main/Express-TS-Decorator-Example)
