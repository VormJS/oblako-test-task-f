import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { Todo } from '../../models/todo';
import { Observable } from 'rxjs';
import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects$: Observable<Project[]>

  constructor(
    private projectDataService: ProjectDataService
  ) { }

  ngOnInit() {
    this.projects$ = this.projectDataService.projects
  }
  toggleTaskComplete(task: Todo): void {
    this.projectDataService.updateTask(task)
  }
}
