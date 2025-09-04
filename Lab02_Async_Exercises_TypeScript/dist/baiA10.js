"use strict";
const promise = new Promise((resolve) => {
    resolve("Thành công");
});
promise.then(result => console.log(result))
    .catch(error => console.log("Error"))
    .finally(() => console.log("Done"));
