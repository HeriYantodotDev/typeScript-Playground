import axios from "axios";

import { AxiosResponse } from "axios";

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
  id: number,
  title: string,
  completed: boolean
}

async function fetchTodo() {
  const response: AxiosResponse<Todo> = await axios.get(url);
  const todo = response.data;

  const logTodo = (id: number, title: string, completed: boolean) => {
    console.log(`
    The Todo With ID: ${id} 
    Has a title of: ${tittle} 
    Is it finished: ${completed}`);
  }

  const id = todo.id;
  const tittle = todo.title;
  const completed = todo.completed;

  logTodo(id, tittle, completed);
}

fetchTodo();