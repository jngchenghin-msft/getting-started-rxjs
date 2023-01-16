import { from, Observable, Observer } from "rxjs";

let numbers = [1, 5, 10];
let source = new Observable(observer => {
    for (let n of numbers) {
        observer.next(n);
    }

    observer.complete();
});

source.subscribe({
    next: value => console.log(`value: ${value}`),
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});