import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute){

  }

  navigateToDetails() {
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      // queryParams: {id: this.i, test: 'wartość'}
      state: {example: 'test'}
    }
    this.router.navigate([this.i], navigationExtras)
  }

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
