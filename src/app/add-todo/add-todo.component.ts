import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(public todosService: TodoService) { }

  title:string= ''

  ngOnInit(): void {
  }

  onAdd(){
    if(this.title !== ''){
      this.todosService.addTodo(this.title)
    }
    this.title = ''
  }
}
