import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AppComponent } from './components/app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NewTaskComponent } from './components/new-task/new-task.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    NewTaskComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
