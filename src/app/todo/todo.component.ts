import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  constructor(public todosService: TodoService) {}
  
  subscription: Subscription = new Subscription;
  public load = false;

  ngOnInit(): void {
    this.subscription = this.todosService.todoFetch().subscribe(() => {
      this.load = true;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onChange(id: number) {
    this.todosService.onTog(id);
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }
}
