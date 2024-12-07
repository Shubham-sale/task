import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  selectedTask: any = null;
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  selectTaskForEdit(task: any): void {
    this.selectedTask = task;
  }

  reloadTasks(): void {
    this.selectedTask = null; 
    if (this.taskListComponent) {
      this.taskListComponent.loadTasks();
  }
  
  }
}
