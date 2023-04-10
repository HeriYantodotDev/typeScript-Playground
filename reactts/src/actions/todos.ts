import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

const URL = 'https://jsonplaceholder.typicode.com/todos';

export interface Todo {
  id: number,
  title: string,
  completed: boolean
};

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo,
  payload: number
}

export interface FetchTodoAction {
  type: ActionTypes.fetchTodos
  payload: Todo[]
};

export const fetchTodos = () => {
  
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>(URL);

    dispatch<FetchTodoAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data
    });

  };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  };
};