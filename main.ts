// import { Observable, map, filter } from "rxjs";

import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { filter } from "rxjs/internal/operators/filter";

let numbers = [1, 5, 10];
let source = new Observable<number>(observer => {
    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 200);
        } else {
            observer.complete();
        }
    }

    produceValue();
}).pipe(map(n => n * 2), filter(n => n > 4));

source.subscribe({
    next: value => console.log(`value: ${value}`),
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});