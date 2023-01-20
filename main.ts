import { Observable } from "rxjs/internal/Observable";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { mergeMap } from "rxjs/internal/operators/mergeMap";
import { retryWhen } from "rxjs/internal/operators/retryWhen";
import { delay } from "rxjs/internal/operators/delay"
import { scan } from "rxjs/internal/operators/scan";
import { takeWhile } from "rxjs/internal/operators/takeWhile";

let output = document.getElementById("output");
let button = document.getElementById("button");
let click = fromEvent(button, "click")

const load = (url: string) => {
    return new Observable(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        })

        xhr.open("GET", url);
        xhr.send();
    }).pipe(retryWhen(retryStrategy({ attempts: 3, d: 1500 })));
}

function retryStrategy({ attempts = 4, d = 1000 }) {
    return function (errors) {
        return errors.pipe(scan((acc, value) => {
            console.log(acc, value);
            return acc + 1;
        }, 0), takeWhile(acc => acc < attempts), delay(d));
    }
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
}

click.pipe(mergeMap(e => load("movies.json"))).subscribe({
    next: renderMovies,
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});