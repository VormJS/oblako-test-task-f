import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Subscription } from 'rxjs';

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
  private subscriptions: Subscription[] = [];
  newTaskForm: FormGroup;
  projects: Project[];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
  ){
    this.subscriptions.push(this.projectService.projects.subscribe( projects => {
      this.projects = projects;
    }));
  }
  ngOnInit(): void {
    this.newTask();

    this.subscriptions.push(this.newTaskForm.get('project').valueChanges.subscribe(value => {
      if (value === 'New'){
        this.newTaskForm.get('newProjectTitle').enable()
      } else {
        this.newTaskForm.get('newProjectTitle').disable()
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.newTaskForm.controls[controlName].hasError(errorName);
  }

  newTask(){
    this.newTaskForm = this.fb.group({
      taskText: ['New task', [Validators.required]],
      project: [null, [Validators.required]],
      newProjectTitle: [{value: null, disabled: true }, [Validators.required, Validators.maxLength(156), Validators.pattern(/^(?!^New\s*$).*/)]]
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
