import { Component } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../core/services/todo.service';
import { TestService } from '../core/services/test.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos: Todo[] = this.todoService.todos;

  errorMessages = '';

  constructor(private todoService: TodoService, private testService: TestService){}


  addTodo(todo: string): void{
    if(todo.length <= 3){
      this.errorMessages = 'Zadanie powinno mieć co najmniej 4 znaki.';
      return;
    }
    this.todoService.addTodo(todo);
    this.todos = this.todoService.todos;
  }

    clearErrorMessage(){
      this.errorMessages = '';
    }

    deleteTodo(i: number){
      this.todoService.deleteTodo(i);
      this.todos = this.todoService.todos;
    }
}
