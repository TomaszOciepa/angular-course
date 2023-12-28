import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? [];
  todoChanged = new Subject<Todo[]>();


  constructor() { }

  public get todos(){
      return this._todos.slice();
  }

  getTodo(index: number): Todo{
    return this.todos[index];
  }

  addTodo(name: string): void{
    this._todos.push({ name, isComplete: false});
    this.saveToLocalStorage();

    this.todoChanged.next(this.todos)
  }

  deleteTodo(i: number){
    this._todos = this.todos.filter((todo, index)=> index !== i)
    this.saveToLocalStorage();

    this.todoChanged.next(this.todos)
  }

  saveToLocalStorage(){
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
}
