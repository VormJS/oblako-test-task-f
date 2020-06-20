import {Todo} from "./todo";

export interface Project {
  id: number;
  title: string;
  todos: Todo[]
}