export class Todo {
  id: number;
  text: string;
  project_id: number;
  isCompleted: boolean;

  toggleCompleted(): void {
    this.isCompleted = !this.isCompleted
  }
}