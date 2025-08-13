import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo';
import { InMemoryDataService } from './in-memory-data.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private inMemoryDataService: InMemoryDataService) {}

  getTodos(): Observable<Todo[]> {
    return of(this.inMemoryDataService.getTodos());
  }

  getTodo(id: number): Observable<Todo | undefined> {
    return of(this.inMemoryDataService.getTodo(id));
  }

  addTodo(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>
  ): Observable<Todo> {
    const newTodo: Todo = {
      id: this.inMemoryDataService.genId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
      ...todo,
    };
    this.inMemoryDataService.addTodo(newTodo);
    return of(newTodo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    this.inMemoryDataService.updateTodo(todo);
    return of(todo);
  }

  deleteTodo(id: number): Observable<void> {
    this.inMemoryDataService.deleteTodo(id);
    return of();
  }
}
