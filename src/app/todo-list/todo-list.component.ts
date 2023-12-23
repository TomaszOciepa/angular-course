import { Component } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos: Todo[] = [];

  errorMessages = '';

  addTodo(todo: string): void{
    if(todo.length <= 3){
      this.errorMessages = 'Zadanie powinno mieć co najmniej 4 znaki.';
      return;
    }

    this.todos.push({ name: todo, isComplete: false});
  }

    clearErrorMessage(){
      this.errorMessages = '';
    }

    deleteTodo(i: number){
      this.todos = this.todos.filter((todo, index)=> index !== i)
    }

}
