import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { Project } from '../models/project';
import { Todo } from '../models/todo';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(API_URL + '/projects').pipe(
      map(plainProjects => plainToClass(Project, plainProjects)),
      catchError(this.handleError<Project[]>('getAllProjects'))
    )
  }
  updateTask(task: Todo): Observable<Todo> {
    return this.http.patch(`${API_URL}/projects/${task.project_id}/todos/${task.id}`, null).pipe(
      map(plainTodo => plainToClass(Todo, plainTodo)),
      catchError(this.handleError<Todo>('updateTask'))
    );
  }
  createProjectAndTask(projectTitle: string, todoText: string): Observable<Todo> {
    const todoJson = JSON.stringify({
      todo: {
        "text": todoText,
        "isCompleted": false,
        "new_project_title": projectTitle
      }
    });
    return this.http.post(`${API_URL}/todos`, todoJson, this.httpOptions).pipe(
      map(plainTodo => plainToClass(Todo, plainTodo)),
      catchError(this.handleError<Todo>('createProjectAndTask'))
    )
  }
  addTaskToProject(projectID: number, todoText: string): Observable<Todo> {
    const todoJson = JSON.stringify({
      todo: {
        "text": todoText,
        "project_id": projectID,
        "isCompleted": false,
      }
    });
    return this.http.post(`${API_URL}/todos`, todoJson, this.httpOptions).pipe(
      map(plainTodo => plainToClass(Todo, plainTodo)),
      catchError(this.handleError<any>('addTaskToProject'))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}