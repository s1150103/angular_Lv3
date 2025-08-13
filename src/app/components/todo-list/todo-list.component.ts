import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Todo,
  TodoStatus,
  TodoPriority,
  TodoCategory,
} from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  allTodos: Todo[] = [];
  filteredTodos: Todo[] = [];

  // Filter properties
  searchText = '';
  filterStatus: TodoStatus | 'all' = 'all';
  filterPriority: TodoPriority | 'all' = 'all';
  filterCategory: TodoCategory | 'all' = 'all';
  sortBy: 'title' | 'dueDate' | 'priority' | 'status' | 'createdAt' =
    'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';

  // Enum options for filters
  statusOptions = ['all', ...Object.values(TodoStatus)];
  priorityOptions = ['all', ...Object.values(TodoPriority)];
  categoryOptions = ['all', ...Object.values(TodoCategory)];
  sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'createdAt', label: 'Created Date' },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.allTodos = todos;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.allTodos];

    // Search filter
    if (this.searchText.trim()) {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter((todo) => todo.status === this.filterStatus);
    }

    // Priority filter
    if (this.filterPriority !== 'all') {
      filtered = filtered.filter(
        (todo) => todo.priority === this.filterPriority
      );
    }

    // Category filter
    if (this.filterCategory !== 'all') {
      filtered = filtered.filter(
        (todo) => todo.category === this.filterCategory
      );
    }

    // Sort
    filtered = this.sortTodos(filtered);

    this.filteredTodos = filtered;
  }

  sortTodos(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => {
      let comparison = 0;

      switch (this.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'dueDate':
          const dateA = a.dueDate
            ? new Date(a.dueDate).getTime()
            : Number.MAX_SAFE_INTEGER;
          const dateB = b.dueDate
            ? new Date(b.dueDate).getTime()
            : Number.MAX_SAFE_INTEGER;
          comparison = dateA - dateB;
          break;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'createdAt':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchText = '';
    this.filterStatus = 'all';
    this.filterPriority = 'all';
    this.filterCategory = 'all';
    this.applyFilters();
  }

  get todos(): Todo[] {
    return this.filteredTodos;
  }

  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.loadTodos();
      });
    }
  }

  toggleStatus(todo: Todo): void {
    const newStatus =
      todo.status === TodoStatus.COMPLETED
        ? TodoStatus.PENDING
        : TodoStatus.COMPLETED;
    const updatedTodo: Todo = {
      ...todo,
      status: newStatus,
      isCompleted: newStatus === TodoStatus.COMPLETED,
      updatedAt: new Date(),
    };

    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.loadTodos();
    });
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

  isOverdue(todo: Todo): boolean {
    if (!todo.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    return dueDate < today && todo.status !== TodoStatus.COMPLETED;
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString();
  }
}
