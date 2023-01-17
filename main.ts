import { Observable } from "rxjs";

let numbers = [1, 5, 10];
let source = new Observable(observer => {
    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 2000);
        } else {
            observer.complete();
        }
    }

    produceValue();
});

source.subscribe({
    next: value => console.log(`value: ${value}`),
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});