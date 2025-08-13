import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
  { path: 'add-todo', component: TodoFormComponent },
  { path: 'edit-todo/:id', component: TodoFormComponent },
  { path: 'todo/:id', component: TodoDetailComponent },
  { path: '**', redirectTo: '/todos' },
];
