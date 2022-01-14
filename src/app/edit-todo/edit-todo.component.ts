import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Todo } from '../shared/todos.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  invalidTodoText = false;

  constructor(
    public dilogRef: MatDialogRef<EditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

  ngOnInit(): void {
  }

  noClose(){
    this.dilogRef.close(false)
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      this.invalidTodoText = true
      return
    }
    this.todo.title = form.value.text;
    const updatedTodo = {
      ...this.todo,
      ...form.value
    }
    this.dilogRef.close(updatedTodo)
  }
}
