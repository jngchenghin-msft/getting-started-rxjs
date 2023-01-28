import { Observable, retryWhen, scan, takeWhile, delay, defer, from } from "rxjs";

export const load = (url: string) => {
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

export function retryStrategy({ attempts = 4, d = 1000 }) {
    return function (errors) {
        return errors.pipe(scan((acc, value) => {
            console.log(acc, value);
            return acc + 1;
        }, 0), takeWhile(acc => acc < attempts), delay(d));
    }
}

export function loadWithFetch(url: string) {
    return defer(() => from(fetch(url).then(res => res.json())));
}