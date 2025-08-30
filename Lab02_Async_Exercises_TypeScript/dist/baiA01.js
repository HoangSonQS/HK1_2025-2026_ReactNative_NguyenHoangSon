"use strict";
const myPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
myPromise.then(result => console.log(result));
