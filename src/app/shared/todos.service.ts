import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { UserService } from '../shared/users.service';
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  public todos: Todo[] = [
    //{id: 1, title: 'Знакомство с Angular', check: true},
    //{id: 2, title: 'Создание todo на Angular', check: false},
    //{id: 3, title: 'Завершение работы с Angular', check: false}
  ];

  constructor(private http: HttpClient,public UserService: UserService) {}

  todoFetch(): Observable<Todo[]> {
    console.log();
    
    return this.http
      .get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?_page=${Number(localStorage.getItem('id'))}`)
      .pipe(tap((todos) => (this.todos = todos)));
  }

  addTodo(title: string) {
    let id = 1;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id+1;
    }
    const newTodo: Todo = {
      id,
      title,
      completed: false,
    };
    this.todos.push(newTodo);
  }

  onTog(id: number) {
    const idx = this.todos.findIndex((todo) => todo.id === id);
    if (idx>=0) {
      this.todos[idx].completed = !this.todos[idx].completed;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
