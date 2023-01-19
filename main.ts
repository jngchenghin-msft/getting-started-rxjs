import { Observable } from "rxjs/internal/Observable";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { map } from "rxjs/internal/operators/map";
import { filter } from "rxjs/internal/operators/filter";
import { delay } from "rxjs/internal/operators/delay";
import { mergeMap } from "rxjs/internal/operators/mergeMap";

let output = document.getElementById("output");
let button = document.getElementById("button");
let click = fromEvent(button, "click")

const load = (url: string) => {
    return new Observable(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        })

        xhr.open("GET", url);
        xhr.send();
    })
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
}

// click.pipe(mergeMap(e => load("movies.json"))).subscribe(o => console.log(o));

click.pipe(mergeMap(e => load("movies.json"))).subscribe({
    next: renderMovies,
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});