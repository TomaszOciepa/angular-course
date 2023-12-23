import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnChanges{

@Input() todo!: Todo;
@Input() i!: number;
@Output() delete = new EventEmitter<void>();

openModal = false;

ngOnChanges(changes: SimpleChanges): void {
  console.log(changes)
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
