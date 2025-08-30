"use strict";
function rejectAfterOneSecond() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
}
rejectAfterOneSecond().catch(resolve => console.log(resolve));
