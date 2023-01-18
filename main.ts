import { fromEvent } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { filter } from "rxjs/internal/operators/filter";
import { delay } from "rxjs/internal/operators/delay";

let source = fromEvent(document, "mousemove")
    .pipe(
        map((n: MouseEvent) => ({ x: n.clientX, y: n.clientY })), 
        filter(value => value.x < 500),
        delay(300));

let circle = document.getElementById("circle");
const onNext = value => {
    circle.style.left = value.x;
    circle.style.top = value.y;
}

source.subscribe({
    next: onNext,
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});