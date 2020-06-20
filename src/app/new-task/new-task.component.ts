import { Component, OnInit } from '@angular/core';
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
  projects: Project[] = [];


  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ){}
  ngOnInit(): void {
    this.newTask();
    this.getProjects();
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
        .subscribe(projects => this.projects = projects);
  }

  submit(newTask:NewTaskData){
    console.log(newTask)
    console.log(this.projects)
    if (newTask.project === 'New' && !(this.projects.findIndex(project => project.title === newTask.newProjectTitle) !== -1)) {
      console.log('works!')
      // createProjectAndTask(newTask.newProjectTitle, newTask.taskText)
    } else {
      console.log('craps!')
    //   addTaskToProject()
    }
  }
  // createProjectAndTask(projectTitle: string, taskText: string): void{
  //   this.projectService.createProjectAndTask(projectTitle, taskText)
  //       .subscribe()
  // }
  // addTaskToProject(task: Todo, projectID: number): void{
  //   this.projectService.updateTask(projectID, task.id)
  //       .subscribe()
  // }
}
