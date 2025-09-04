"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectAfterOneSecond = rejectAfterOneSecond;
function rejectAfterOneSecond() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
}
// rejectAfterOneSecond().catch(resolve => console.log(resolve))
