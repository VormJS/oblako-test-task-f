import { Todo } from "./todo";
import { Type } from "class-transformer";

export class Project {

  constructor(title: string) {
    this.title = title;
  }

  id: number;
  title: string;
  @Type(() => Todo)
  todos: Todo[]
}