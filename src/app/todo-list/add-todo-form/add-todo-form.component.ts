import { NgFor } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements AfterViewInit{

  @Output() addTodo = new EventEmitter<string>();
  @ViewChild('form') todoForm!: NgForm;

  todoName = '';

  addNewTodo(form: NgForm){
    console.log(form)
    this.addTodo.emit(this.todoName);
  }

  ngAfterViewInit(): void {
    console.log(this.todoForm)
  }
}
