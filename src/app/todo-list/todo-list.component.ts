import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoApiService } from '../core/services/todo-api.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy{

  todos: Todo[] = this.todoService.todos;

  errorMessages = '';

  sub!: Subscription;

  constructor(private todoService: TodoService, private todoApiService: TodoApiService){}

  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: arrTodos => this.todos = arrTodos
    })  

    this.todoApiService.getTodos().subscribe({
      next: todos => {
        // console.log(todos)
        this.todos = todos;
      }
    })
  }
  
  addTodo(todo: string): void{
    if(todo.length <= 3){
      this.errorMessages = 'Zadanie powinno mieć co najmniej 4 znaki.';
      return;
    }
    this.todoService.addTodo(todo);
    // this.todos = this.todoService.todos;
  }

    clearErrorMessage(){
      this.errorMessages = '';
    }

    deleteTodo(i: number){
      this.todoService.deleteTodo(i);
      // this.todos = this.todoService.todos;
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}
