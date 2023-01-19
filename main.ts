import { fromEvent } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { filter } from "rxjs/internal/operators/filter";
import { delay } from "rxjs/internal/operators/delay";

let output = document.getElementById("output");
let button = document.getElementById("button");
let click = fromEvent(button, "click")

const load = (url: string) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement("div");
            div.innerText = m.title;
            output.appendChild(div);
        });
    })

    xhr.open("GET", url);
    xhr.send();
}

click.subscribe({
    next: e => load("movies.json"),
    error: err => console.log(`err: ${err}`),
    complete: () => console.log('complete')
});