import {Todo} from "../../models/todo";

export interface Project {
  id: number;
  title: string;
  todos: Todo[]
}