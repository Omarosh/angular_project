import { Component } from '@angular/core';
import { filter, from, interval, map, Observable, of, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-observable-test-component',
  imports: [],
  templateUrl: './observable-test-component.html',
  styleUrl: './observable-test-component.css',
})
export class ObservableTestComponent {

  numbersArray: number[] = [1, 2, 3, 4, 5];

  staticArrayObservable: Observable<number[]> = of(this.numbersArray);
  basicObservable: Observable<number> = from(this.numbersArray);
  intervalObservable: Observable<number> = interval(500).pipe(take(10));

  subscriptions: Subscription[] = [];

  objectObservable: Observable<{ id: number, fname: string, lname: string }> = of({ id: 1, fname: 'John', lname: 'Doe' });

  // test debounce time


  ngOnInit(): void {
    // this.subscriptions.push(this.staticArrayObservable.subscribe((value: number[]) => {
    //   console.log('staticArrayObservable', value);

    // }));
    // this.subscriptions.push(this.basicObservable.subscribe((value: number) => {
    //   console.log('basicObservable', value);
    //   }));

    // this.subscriptions.push(this.intervalObservable.subscribe((value: number) => {
    //   console.log('intervalObservable', value);
    // }));

    this.intervalObservable = this.intervalObservable.pipe(filter((value: number) => value % 2 === 0));

    this.subscriptions.push(this.intervalObservable.subscribe((value: number) => {
      console.log('intervalObservable', value);
    }));

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}