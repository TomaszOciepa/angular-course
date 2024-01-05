import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoApiService } from '../core/services/todo-api.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as TodoListActions from './store/todo-list-action';
import {
  selectTodoListActiveTodos,
  selectTodoListTodos,
} from './store/todo-list.selector';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  // todos: Todo[] = this.todoService.todos;
  todos: Todo[] = [];

  errorMessages = '';

  sub!: Subscription;

  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.sub = this.todoService.todoChanged.subscribe({
    //   next: (arrTodos) => (this.todos = arrTodos),
    // });
    // if (this.todos.length === 0) {
    //   this.todoApiService.getTodos().subscribe({
    //     error: (err) => {
    //       this.errorMessages = 'Wystąpił błąd spróbuj ponownie.';
    //     },
    //   });
    // }

    this.sub = this.store.pipe(select(selectTodoListTodos)).subscribe({
      next: (todos) => {
        console.log('Wszystkie zadania', todos);
        this.todos = [...todos];
      },
    });

    // this.store.select(selectTodoListActiveTodos).subscribe({
    //   next: (todos) => {
    //     console.log('Aktywne zadania', todos);
    //     // this.todos = [...todos];
    //   },
    // });
  }

  addTodo(todo: string): void {
    // this.todoApiService.postTodo({name: todo, isComplete: false}).subscribe({
    //   error: err =>{
    //     this.errorMessages = 'Wystąpił błąd spróbuj ponownie.'
    //   }
    // })
    // this.todos = this.todoService.todos;

    const id = this.todos[this.todos.length - 1].id + 1;
    this.store.dispatch(
      TodoListActions.addTodo({ todo: { id, name: todo, isComplete: false } })
    );
  }

  clearErrorMessage() {
    this.errorMessages = '';
  }

  deleteTodo(id: number) {
    // this.todoApiService.deleteTodo(id).subscribe({
    //   error: (err) => {
    //     this.errorMessages = 'Wystąpił błąd spróbuj ponownie.';
    //   },
    // });

    this.store.dispatch(TodoListActions.deleteTodo({ id }));
  }

  changeToDoStatus(id: number, todo: Todo) {
    // this.todoApiService
    //   .patchTodo(id, { isComplete: !todo.isComplete })
    //   .subscribe({
    //     error: (err) => {
    //       this.errorMessages = 'Wystąpił błąd spróbuj ponownie.';
    //     },
    //   });
    this.store.dispatch(TodoListActions.changeTodoStatus({ id }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
