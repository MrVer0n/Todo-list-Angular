import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public todosService: TodoService) { }

  ngOnInit(): void {
  }

  onChenge(id: number){
    this.todosService.onTog(id)
  }
  removeTodo(id: number){
    this.todosService.removeTodo(id)
  }

}
