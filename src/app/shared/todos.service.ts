import { Injectable } from "@angular/core";

export interface Todo {
    id: number
    title: string
    check: boolean
  }

@Injectable({providedIn: 'root'})
export class TodoService {
    public todos: Todo[] = [
        {id: 1, title: 'Знакомство с Angular', check: true},
        {id: 2, title: 'Создание todo на Angular', check: false},
        {id: 3, title: 'Завершение работы с Angular', check: false}
      ] 

    onTog(id: number){
        const idx = this.todos.findIndex(todo=>todo.id === id)
        this.todos[idx].check = !this.todos[idx].check
    }
    removeTodo(id: number){
        this.todos = this.todos.filter(todo=>todo.id !== id)
    }
}