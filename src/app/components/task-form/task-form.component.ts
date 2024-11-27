import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Import CommonModule and ReactiveFormsModule
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  @Input() taskToEdit: any = null; // Receive task to edit
  @Output() taskUpdated = new EventEmitter<void>(); // Notify parent to reload tasks

  taskForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnChanges(): void {
    if (this.taskToEdit) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.taskToEdit);
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.isEditMode) {
        this.updateTask();
      } else {
        this.addTask();
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  addTask(): void {
    this.taskService.addTask(this.taskForm.value).subscribe(() => {
      this.taskUpdated.emit();
      this.resetForm();
    });
  }

  updateTask(): void {
    this.taskService
      .updateTask(this.taskToEdit.id, this.taskForm.value)
      .subscribe(() => {
        this.taskUpdated.emit();
        this.resetForm();
        
      });
  }

  resetForm(): void {
    this.taskForm.reset();
    this.isEditMode = false;
  }
}
