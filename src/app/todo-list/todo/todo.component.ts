import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements DoCheck{

@Input() todo!: Todo;
@Input() i!: number;
@Output() delete = new EventEmitter<void>();

openModal = false;

keyValueTest = {name: 'test', age: 12}

  ngDoCheck(): void {
    console.log("ngDoCheck został wykonany")
    }

changeTodoStatus(todo: Todo) {
  todo.isComplete = !todo.isComplete;

}

toggleModal():void{
  this.openModal = !this.openModal;
}

deleteTodo(){
  this.delete.emit();
}

}
