import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { Todo } from './todo';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getProjects()
  }

  getProjects(): void {
    this.projectService.getProjects()
        .subscribe(projects => this.projects = projects);
  }
  completeTask(task: Todo, projectID: number): void{
    task.isCompleted = !task.isCompleted
    // console.log(JSON.stringify(task) + '\nprojectID: ' + projectID)
    this.projectService.updateTask(projectID, task.id)
        .subscribe()
  }
}
