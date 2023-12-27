import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, filter, from, fromEvent, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy{

  @Input() title!: string;
  @Output() close = new EventEmitter<void>();

  sub!: Subscription;
 


  onClose(){
    this.close.emit();
  }

  ngOnInit(): void {
    // this.sub = of(1).subscribe({
    //   next: value => console.log(value),
    //   error: err => console.log(err),
    //   complete: () => console.log('Test')
    // })
    of(1).pipe(
        switchMap(numb => of(numb *2))
      )
      .subscribe({
        next: numb => console.log(numb)
      })

    // console.log(this.sub);
    
  }
  ngOnDestroy(): void {
    if(this.sub){
      // this.sub.unsubscribe();
    }
    // console.log(this.sub);

  }

}
