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

    if(this.todos.length === 0){
      this.todoApiService.getTodos().subscribe({
        error: err =>{
          this.errorMessages = 'Wystąpił błąd spróbuj ponownie.'
        }
      })
    }
    
  }
  
  addTodo(todo: string): void{
    this.todoApiService.postTodo({name: todo, isComplete: false}).subscribe({
      error: err =>{
        this.errorMessages = 'Wystąpił błąd spróbuj ponownie.'
      }
    })
    
    // this.todos = this.todoService.todos;
  }

    clearErrorMessage(){
      this.errorMessages = '';
    }

    deleteTodo(id: number){
      this.todoApiService.deleteTodo(id).subscribe({
        error: err =>{
          this.errorMessages = 'Wystąpił błąd spróbuj ponownie.'
        }
      })
    }

    changeToDoStatus(id: number, todo: Todo){
      this.todoApiService.patchTodo(id, {isComplete: !todo.isComplete}).subscribe({
       error: err => {
        this.errorMessages = 'Wystąpił błąd spróbuj ponownie.'
      }

      })
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}
