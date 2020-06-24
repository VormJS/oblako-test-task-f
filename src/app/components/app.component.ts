import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../components/new-task/new-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) { }

  newTask() {
    this.dialog.open(NewTaskComponent);
  }

  title = 'oblako-test-task-f';
}
