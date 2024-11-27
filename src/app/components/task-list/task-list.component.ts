import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks: any[] = [];
  @Output() editTaskEvent = new EventEmitter<any>(); 
  @Output() taskDeleted = new EventEmitter<void>(); 

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: any) => (this.tasks = data));
  }

  editTask(task: any): void {
    this.editTaskEvent.emit(task);
    
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.taskDeleted.emit();
      this.loadTasks();
    });
  }
}
