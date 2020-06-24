import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { APIService } from './api.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  private _projects = new BehaviorSubject<Project[]>([])
  private _objectStore: Project[] = []
  readonly projects: Observable<Project[]> = this._projects.asObservable()


  constructor(
    private apiService: APIService
  ) {
    this.getAllProjects()
  }

  getAllProjects(): void {
    this.apiService.getAllProjects().subscribe(
      projects => {
        this._objectStore = projects;
        this._projects.next(this._objectStore);
      }
    )
  }

  updateTask(task: Todo): void {
    this.apiService.updateTask(task).subscribe(
      todo => {
        if (todo.id === task.id) {
          task.toggleCompleted();
          this._projects.next(this._objectStore);
        }
      }
    )
  }
  createProjectAndTask(newProjectTitle: string, newTodoText: string): void {
    const projectIfExists = this._objectStore.find(project => project.title === newProjectTitle)
    if (projectIfExists) {
      this.addTaskToProject(projectIfExists.id, newTodoText)
    } else {
      this.apiService.createProjectAndTask(newProjectTitle, newTodoText).subscribe(
        todo => {
          if (todo.text === newTodoText) {
            this.getAllProjects()
          }
        }
      )
    }
  }
  addTaskToProject(projectID: number, todoText: string) {
    this.apiService.addTaskToProject(projectID, todoText).subscribe(
      todo => {
        if (todo.text === todoText && todo.project_id === projectID) {
          this._objectStore.find(project => project.id === projectID).todos.push(todo)
          this._projects.next(this._objectStore);
        }
      }
    )
  }
}
