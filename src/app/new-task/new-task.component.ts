import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../projects/project.service';
import { Project } from '../projects/project';

interface NewTaskData {
  taskText: string,
  project: string,
  newProjectTitle: string
}

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  newTaskForm: FormGroup;
  projects: Project[];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
  ){
    this.projectService.projects.subscribe( projects => {
      this.projects = projects;
    });
  }
  ngOnInit(): void {
    this.newTask();
  }

  newTask(){
    this.newTaskForm = this.fb.group({
      taskText: ['New task'],
      project: ['Home task'],
      newProjectTitle: []
    });
  }

  getProjects(): void {
    this.projectService.getProjects()
  }

  submit(newTask:NewTaskData){
    const newProjectPicked = newTask.project === 'New'
    const projectTitle = newProjectPicked ? newTask.newProjectTitle : newTask.project
    const targetProject = this.projects.find(project => project.title === projectTitle)

    if (newProjectPicked && !targetProject){ 
      this.createProjectAndTask(projectTitle, newTask.taskText)
    } else {
      this.addTaskToProject(targetProject.id, newTask.taskText)
    }
  }
  createProjectAndTask(projectTitle: string, taskText: string): void{
    this.projectService.createProjectAndTask(projectTitle, taskText)
        .subscribe()
  }
  addTaskToProject(projectID: number, taskText: string): void{
    this.projectService.addTaskToProject(projectID, taskText)
        .subscribe()
  }
}
