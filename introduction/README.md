# Introduction

[Notion Link](https://www.notion.so/TypeScript-The-Complete-Developer-s-Guide-ba9582b22711462e862ffb314603e482?pvs=4#b3ef15746c34447b8c7b707763c53122)

> TypeScript = JavaScript + A Type System

About TS Type System:

- Catch errors during development
- Uses `type annotations` to analyze our code
- Only active during development
- Doesn’t provide any performance optimization

## Environment Setup

`npm install -g ts-node` installs the `ts-node` package globally, which allows you to run TypeScript files directly from the command line without having to first compile them to JavaScript. This package provides a convenient way to run TypeScript code during development and testing.

- [ts-node - npm (npmjs.com)](https://www.npmjs.com/package/ts-node)
- [ts-node | ts-node (typestrong.org)](https://typestrong.org/ts-node/)

- Set up prettier
- go to file - preferences - setting - checkmark `format on Save`
- use single quotes :
  - file - preferences - setting - search : `single quotes`: check - prettier : single quote
  -
- Identation : 2
- Controls the visibility of the activity bar in the workbench. We unchecked then it won’t show others bar like extension etc.
- `ts-node` won’t compile our TS file to JS file but it executes it automatically. So it’s better we use `tsc --watch` and then run the JS file.

## Practice

Here’s what we’re going to do:

- Take a look at the API we’ll use to fetch data
  - `[jsonplaceholder.typicode.com](http://jsonplaceholder.typicode.com)`
  - For example we want to fetch this data : [`https://jsonplaceholder.typicode.com/todos/1`](https://jsonplaceholder.typicode.com/todos/1)
  -
- Create a new project directory
- Create a package.json file
- Install axios to make a request
  - When we use `const axios = require('axios'). there might be an error, therefore we have to install this
  ```tsx
  npm i --save-dev @types/node
  ```
- ## write code

  ```tsx
  const axios = require('axios');

  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  axios.get(url).then((response) => {
    console.log(response.data);
  });
  ```

Ok now we can run this like this : `ts-node index.ts` to compile the data to JS and run it.

## Bug Hunting

Let’s take a look at this code

```tsx
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/todos/1';

axios.get(url).then((response) => {
  const todo = response.data;

  const ID = todo.ID;
  const tittle = todo.Title;
  const finished = todo.finished;

  console.log(`
  The Todo With ID: ${ID} 
  Has a title of: ${tittle} 
  Is it finished: ${finished}`);
});
```

As you can see above the code above is error. Why?

Because the [`response.data`](http://response.data) doesn’t have any properties called `ID` , `tittle`, `finished` and the rest.

to do that we can define an `interface` and set the type for the response :

```tsx
import { AxiosResponse } from 'axios';

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((response: AxiosResponse<Todo>) => {
  const todo = response.data;

  const ID = todo.id;
  const tittle = todo.title;
  const finished = todo.completed;

  console.log(`
  The Todo With ID: ${ID} 
  Has a title of: ${tittle} 
  Is it finished: ${finished}`);
});
```

Now every time we write down for example `todo.` it has some properties within it.

## More Bug Hunting

Now let’s take a look at this code :

```tsx
import axios from 'axios';

import { AxiosResponse } from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodo() {
  const response: AxiosResponse<Todo> = await axios.get(url);
  const todo = response.data;

  const logTodo = (id: number, title: string, completed: boolean): void => {
    console.log(`
    The Todo With ID: ${id} 
    Has a title of: ${tittle} 
    Is it finished: ${completed}`);
  };

  const id = todo.id;
  const tittle = todo.title;
  const completed = todo.completed;

  logTodo(id, tittle, completed);
}

fetchTodo();
```

If we change the order of the argument :

for example to be :

`logTodo(id, completed , tittle);`

TS will show errros :

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4622c13a-4a1f-4929-aa12-1d2655f566d8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T132445Z&X-Amz-Expires=86400&X-Amz-Signature=d10f1dedc951d42e720902d2d519f319624458f12ef0c65ae385db91f1e72009&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

Now we can catch error without running it.

There are two important things when we learn TypeScript:

1. Syntax + Features
2. Design Patterns with TypeScript
   1. How do we use interfaces to write reusable code?

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/86fb3b25-1a99-4920-9121-ded1de7c5d2c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T132508Z&X-Amz-Expires=86400&X-Amz-Signature=f7c4b424b313f750de190a2e2712c77e926b9f1c8f33b5623eec7b7afe478df1&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
