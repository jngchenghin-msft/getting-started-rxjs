import { catchError, from, merge, Observable, of, throwError } from "rxjs";

// let source = new Observable(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.error("Stop!");
//     observer.next(3);
//     observer.complete();
// })

let source = merge(of(1), from([2, 3, 4]), throwError(new Error("stop")), of(5)).pipe(catchError(e => {
    console.log(`caught ${e}`);
    return of(10);
}));

source.subscribe({
    next: val => console.log(`value ${val}`),
    error: err => console.log(`error: ${err}`),
    complete: () => console.log("complete")
});

// let output = document.getElementById("output");
// let button = document.getElementById("button");
// let click = fromEvent(button, "click")

// function renderMovies(movies) {
//     movies.forEach(m => {
//         let div = document.createElement("div");
//         div.innerText = m.title;
//         output.appendChild(div);
//     })
// }

// loadWithFetch("movies.json");

// click.pipe(mergeMap(e => loadWithFetch("movies.json"))).subscribe({
//     next: renderMovies,
//     error: err => console.log(`err: ${err}`),
//     complete: () => console.log('complete')
// });