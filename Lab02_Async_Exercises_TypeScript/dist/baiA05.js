"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateTask = simulateTask;
function simulateTask(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}
simulateTask(5000).then(result => console.log(result));
