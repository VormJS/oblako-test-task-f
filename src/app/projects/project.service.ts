import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';

// const projectList: Project[] = 
// [
//   {id: 1, title: 'Home Tasks', todos:
//     [
//       {
//         id: 1,
//         text: 'test_todo1',
//         isCompleted: true
//       },{
//         id: 2,
//         text: 'test_todo2',
//         isCompleted: false
//       }
//     ]
//   },
//   {id: 2, title: 'Work Tasks', todos: []},
//   {id: 3, title: 'Other Tasks', todos: []},
//   {id: 4, title: 'Bonus Tasks', todos: []}
// ];

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor( private http: HttpClient) { }
  private projectsUrl = 'https://cors-anywhere.herokuapp.com/https://vast-depths-88918.herokuapp.com/projects'
  // private projectsUrl = 'https://vast-depths-88918.herokuapp.com/projects'

  getProjects(): Observable<Project[]> {
    // return of(projectList);
    return this.http.get<Project[]>(this.projectsUrl)
    .pipe(
      catchError(this.handleError<Project[]>('getProjects', []))
    );
  }
  updateTask(projectID: number, taskID: number): Observable<any>{
    return this.http.patch(this.projectsUrl + `/${projectID}/todos/${taskID}`, null).pipe(
      catchError(this.handleError<any>('updateTask'))
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
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}