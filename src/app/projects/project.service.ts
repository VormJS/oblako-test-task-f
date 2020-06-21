import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';



@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) { }
  // private projectsUrl = 'https://cors-anywhere.herokuapp.com/https://vast-depths-88918.herokuapp.com/projects'
  private projectsUrl = 'https://vast-depths-88918.herokuapp.com/projects'

  // private todosUrl = 'https://cors-anywhere.herokuapp.com/https://vast-depths-88918.herokuapp.com/todos'
  private todosUrl = 'https://vast-depths-88918.herokuapp.com/todos'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProjects(): void {
    this.http.get<Project[]>(this.projectsUrl).subscribe(input => this.projects.next(input))
  }
  updateTask(projectID: number, taskID: number): Observable<any>{
    return this.http.patch(this.projectsUrl + `/${projectID}/todos/${taskID}`, null).pipe(
      tap(_ => this.getProjects()),
      catchError(this.handleError<any>('updateTask'))
    );
  }
  createProjectAndTask(projectTitle: string, taskText: string): Observable<any>{
    const todoJson= JSON.stringify({todo: {
      "text": taskText,
      "isCompleted": false,
      "is_new_project": "true",
      "new_project_title": projectTitle
    }});
    return this.http.post(this.todosUrl, todoJson, this.httpOptions).pipe(
      tap(_ => this.getProjects()),
      catchError(this.handleError<any>('createProjectAndTask'))
    )
  }
  addTaskToProject(projectID: number, taskText: string): Observable<any>{
    const todoJson= JSON.stringify({todo: {
      "text": taskText,
      "project_id": projectID,
      "isCompleted": false,
    }});
    return this.http.post(this.todosUrl, todoJson, this.httpOptions).pipe(
      tap(_ => this.getProjects()),
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
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}