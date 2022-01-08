import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, tap } from "rxjs";
export interface Todo {
    id: number
    title: string
    completed: boolean
  }

@Injectable({providedIn: 'root'})
export class TodoService {
    public todos: Todo[] = [
        //{id: 1, title: 'Знакомство с Angular', check: true},
        //{id: 2, title: 'Создание todo на Angular', check: false},
        //{id: 3, title: 'Завершение работы с Angular', check: false}
      ] 

constructor(private http: HttpClient){}

 todoFetch(): Observable<Todo[]>{
  return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_page=1')   
  .pipe(tap(todos => this.todos = todos))

  
}
    addTodo(title: string){
      let id = 1
      console.log(id);
      if(this.todos.length !== 0)
      {
        id = this.todos[this.todos.length-1].id+1
      }
      const newTodo:Todo = {
        id: id,
        title: title,
        completed: false
      }
      this.todos.push(newTodo)
    }

    onTog(id: number){
        const idx = this.todos.findIndex(todo=>todo.id === id)
        this.todos[idx].completed = !this.todos[idx].completed
    }
    removeTodo(id: number){
        this.todos = this.todos.filter(todo=>todo.id !== id)
    }
}