import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import {
  Todo,
  TodoStatus,
  TodoPriority,
  TodoCategory,
} from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;
  isEditMode = false;
  todoId: number | null = null;

  // Enum properties for template
  statusOptions = Object.values(TodoStatus);
  priorityOptions = Object.values(TodoPriority);
  categoryOptions = Object.values(TodoCategory);

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.todoForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
      status: [TodoStatus.PENDING, Validators.required],
      priority: [TodoPriority.MEDIUM, Validators.required],
      category: [TodoCategory.OTHER, Validators.required],
      dueDate: [''],
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.todoId = parseInt(id, 10);
      this.loadTodo(this.todoId);
    }
  }

  private loadTodo(id: number): void {
    this.todoService.getTodo(id).subscribe((todo) => {
      if (todo) {
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description,
          status: todo.status,
          priority: todo.priority,
          category: todo.category,
          dueDate: todo.dueDate ? this.formatDateForInput(todo.dueDate) : '',
        });
      }
    });
  }

  private formatDateForInput(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const todoData = {
        title: formValue.title.trim(),
        description: formValue.description.trim(),
        status: formValue.status,
        priority: formValue.priority,
        category: formValue.category,
        dueDate: formValue.dueDate ? new Date(formValue.dueDate) : null,
      };

      if (this.isEditMode && this.todoId) {
        const updatedTodo: Todo = {
          ...todoData,
          id: this.todoId,
          createdAt: new Date(),
          updatedAt: new Date(),
          isCompleted: todoData.status === TodoStatus.COMPLETED,
        };
        this.todoService.updateTodo(updatedTodo).subscribe(() => {
          this.router.navigate(['/todos']);
        });
      } else {
        this.todoService.addTodo(todoData).subscribe(() => {
          this.router.navigate(['/todos']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/todos']);
  }

  getFieldError(fieldName: string): string {
    const control = this.todoForm.get(fieldName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName} is required`;
      }
      if (control.errors['minlength']) {
        return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${fieldName} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.todoForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }
}
