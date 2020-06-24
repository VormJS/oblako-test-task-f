import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../models/project';
import { Subscription, Observable } from 'rxjs';
import { ProjectDataService } from '../../services/project-data.service';

interface NewTaskData {
  taskText: string,
  project: number,
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
  projects$: Observable<Project[]>

  constructor(
    private fb: FormBuilder,
    private projectDataService: ProjectDataService
  ) {
    this.projects$ = this.projectDataService.projects
  }
  ngOnInit(): void {
    this.newTask();

    this.subscriptions.push(this.newTaskForm.get('project').valueChanges.subscribe(value => {
      if (value === 0) {
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

  public hasError = (controlName: string, errorName: string) => {
    return this.newTaskForm.controls[controlName].hasError(errorName);
  }

  newTask() {
    this.newTaskForm = this.fb.group({
      taskText: ['New task', [Validators.required]],
      project: [null, [Validators.required]],
      newProjectTitle: [{ value: null, disabled: true }, [Validators.required, Validators.maxLength(156), Validators.pattern(/^(?!^New\s*$).*/)]]
    });
  }

  submit(newTask: NewTaskData) {
    if (newTask.project === 0) {
      this.projectDataService.createProjectAndTask(newTask.newProjectTitle, newTask.taskText)
    } else {
      this.projectDataService.addTaskToProject(newTask.project, newTask.taskText)
    }
  }
}
