import { catchError, from, fromEvent, merge, mergeMap, Observable, of, throwError } from "rxjs";
import { load, loadWithFetch } from "./loader";

let output = document.getElementById("output");
let button = document.getElementById("button");
let click = fromEvent(button, "click")

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
}

const subscription = load("moviess.json").subscribe({
    next: renderMovies, error: e => console.log("error: ", e), complete: () => console.log("complete")
});
subscription.unsubscribe();

click.pipe(mergeMap(e => loadWithFetch("movies.json"))).subscribe({
    next: renderMovies,
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});