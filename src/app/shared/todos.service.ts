import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { Observable, tap } from 'rxjs';

import { UserService } from '../shared/users.service';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

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

  constructor(
    private http: HttpClient,
    public UserService: UserService,
    private dialog: MatDialog
  ) {}

  todoFetch(): Observable<Todo[]> {
    console.log();

    return this.http
      .get<Todo[]>(
        `https://jsonplaceholder.typicode.com/todos?_page=${Number(
          localStorage.getItem('id')
        )}`
      )
      .pipe(tap((todos) => (this.todos = todos)));
  }

  addTodo(title: string) {
    let id = 1;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    }
    const newTodo: Todo = {
      id,
      title,
      completed: false,
    };
    this.todos.push(newTodo);
  }

  updateTodo(idx: number, updateTodo: Todo) {
    this.todos[idx] = updateTodo;
  }

  editTodo(todo: Todo) {
    const idx = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoComponent, {
      width: '700px',
      data: todo,
    });
    dialogRef.afterClosed().subscribe((respons) => {
      console.log(respons);
      
      if (respons) {
        this.updateTodo(idx, respons);
      }
    });
  }

  onTog(id: number) {
    const idx = this.todos.findIndex((todo) => todo.id === id);
    if (idx >= 0) {
      this.todos[idx].completed = !this.todos[idx].completed;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
