import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { Todo } from '../../models/todo';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService) {
    this.projectService.projects.subscribe( projects => {
      this.projects = projects;
    });
  }

  ngOnInit() {
    this.getProjects()
  }
  getProjects(): void {
    this.projectService.getProjects()
  }
  completeTask(task: Todo, projectID: number): void{
    task.isCompleted = !task.isCompleted
    this.projectService.updateTask(projectID, task.id)
        .subscribe()
  }
}
