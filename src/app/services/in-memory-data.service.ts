import { Injectable } from '@angular/core';
import { Todo, TodoStatus, TodoPriority, TodoCategory } from '../models/todo';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  private todos: Todo[] = [];
  private defaultTodos: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular',
      description: 'Study Angular framework basics',
      status: TodoStatus.IN_PROGRESS,
      priority: TodoPriority.HIGH,
      category: TodoCategory.EDUCATION,
      dueDate: new Date('2024-12-31'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Build Todo App',
      description: 'Create a todo application with CRUD operations',
      status: TodoStatus.IN_PROGRESS,
      priority: TodoPriority.URGENT,
      category: TodoCategory.WORK,
      dueDate: new Date('2024-12-15'),
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Add Bootstrap',
      description: 'Style the app with Bootstrap components',
      status: TodoStatus.COMPLETED,
      priority: TodoPriority.MEDIUM,
      category: TodoCategory.WORK,
      dueDate: null,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
      isCompleted: true,
    },
    {
      id: 4,
      title: 'Implement Router',
      description: 'Add navigation between pages',
      status: TodoStatus.COMPLETED,
      priority: TodoPriority.MEDIUM,
      category: TodoCategory.WORK,
      dueDate: null,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04'),
      isCompleted: true,
    },
    {
      id: 5,
      title: 'Buy Groceries',
      description: 'Buy milk, bread, and eggs',
      status: TodoStatus.PENDING,
      priority: TodoPriority.LOW,
      category: TodoCategory.SHOPPING,
      dueDate: new Date('2024-12-20'),
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      isCompleted: false,
    },
  ];

  constructor(private storageService: StorageService) {
    this.loadTodosFromStorage();
  }

  private loadTodosFromStorage(): void {
    const savedTodos = this.storageService.loadData<Todo[]>();
    if (savedTodos && Array.isArray(savedTodos)) {
      // Convert date strings back to Date objects
      this.todos = savedTodos.map((todo) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    } else {
      // Use default todos if no saved data
      this.todos = [...this.defaultTodos];
      this.saveTodosToStorage();
    }
  }

  private saveTodosToStorage(): void {
    this.storageService.saveData(this.todos);
  }

  getTodos(): Todo[] {
    return [...this.todos];
  }

  getTodo(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  addTodo(todo: Todo): void {
    const now = new Date();
    const newTodo: Todo = {
      ...todo,
      id: this.genId(),
      createdAt: now,
      updatedAt: now,
      isCompleted: todo.status === TodoStatus.COMPLETED,
    };
    this.todos.push(newTodo);
    this.saveTodosToStorage();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = {
        ...updatedTodo,
        updatedAt: new Date(),
        isCompleted: updatedTodo.status === TodoStatus.COMPLETED,
      };
      this.saveTodosToStorage();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodosToStorage();
  }

  genId(): number {
    return this.todos.length > 0
      ? Math.max(...this.todos.map((todo) => todo.id)) + 1
      : 1;
  }
}
