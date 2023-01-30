import { Observable, retryWhen, scan, takeWhile, delay, defer, from } from "rxjs";

export const load = (url: string) => {
    return new Observable(observer => {
        let xhr = new XMLHttpRequest();

        const onLoad = () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        }

        xhr.addEventListener("load", onLoad);

        xhr.open("GET", url);
        xhr.send();

        return () => {
            console.log('cleanup');
            xhr.removeEventListener("load", onLoad);
            xhr.abort();
        }
    }).pipe(retryWhen(retryStrategy({ attempts: 3, d: 1500 })));
}

export function retryStrategy({ attempts = 4, d = 1000 } = {}) {
    return function (errors) {
        return errors.pipe(scan((acc, value) => {
            acc++;
            if (acc < attempts) {
                return acc;
            } else {
                throw new Error(value.toString());
            }
        }, 0), delay(d));
    }
}

export function loadWithFetch(url: string) {
    return defer(() => from(fetch(url).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    }))).pipe(retryWhen(retryStrategy()));
}