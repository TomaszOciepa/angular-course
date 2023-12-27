import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, interval, of, take } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy{

  @Input() title!: string;
  @Output() close = new EventEmitter<void>();

  sub!: Subscription;
  obs$ = interval(1000);


  onClose(){
    this.close.emit();
  }

  ngOnInit(): void {
    // this.sub = of(1).subscribe({
    //   next: value => console.log(value),
    //   error: err => console.log(err),
    //   complete: () => console.log('Test')
    // })
    
    // this.sub = interval(1000).pipe(take(5)).subscribe({
    //   next: number => console.log(number)
    // });
    // console.log(this.sub);
    
  }
  ngOnDestroy(): void {
    // console.log(this.sub);
    // this.sub.unsubscribe();
  }

}
