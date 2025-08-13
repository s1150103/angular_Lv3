import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import {
  Todo,
  TodoStatus,
  TodoPriority,
  TodoCategory,
} from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTodo(parseInt(id, 10));
    } else {
      this.router.navigate(['/todos']);
    }
  }

  loadTodo(id: number): void {
    this.todoService.getTodo(id).subscribe((todo) => {
      this.todo = todo || null;
      this.loading = false;
      if (!this.todo) {
        this.router.navigate(['/todos']);
      }
    });
  }

  toggleStatus(): void {
    if (!this.todo) return;

    const newStatus =
      this.todo.status === TodoStatus.COMPLETED
        ? TodoStatus.PENDING
        : TodoStatus.COMPLETED;
    const updatedTodo: Todo = {
      ...this.todo,
      status: newStatus,
      isCompleted: newStatus === TodoStatus.COMPLETED,
      updatedAt: new Date(),
    };

    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.todo = updatedTodo;
    });
  }

  deleteTodo(): void {
    if (!this.todo) return;

    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(this.todo.id).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    }
  }

  getPriorityBadgeClass(priority: TodoPriority): string {
    switch (priority) {
      case TodoPriority.URGENT:
        return 'bg-danger';
      case TodoPriority.HIGH:
        return 'bg-warning';
      case TodoPriority.MEDIUM:
        return 'bg-info';
      case TodoPriority.LOW:
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }

  getStatusBadgeClass(status: TodoStatus): string {
    switch (status) {
      case TodoStatus.COMPLETED:
        return 'bg-success';
      case TodoStatus.IN_PROGRESS:
        return 'bg-primary';
      case TodoStatus.PENDING:
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  isOverdue(): boolean {
    if (!this.todo || !this.todo.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(this.todo.dueDate);
    return dueDate < today && this.todo.status !== TodoStatus.COMPLETED;
  }

  formatDate(date: Date | null): string {
    if (!date) return 'Not set';
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatDateOnly(date: Date | null): string {
    if (!date) return 'Not set';
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
