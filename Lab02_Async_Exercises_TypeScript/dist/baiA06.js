"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baiA05_1 = require("./baiA05");
const task1 = (0, baiA05_1.simulateTask)(1000);
const task2 = (0, baiA05_1.simulateTask)(1000);
const task3 = (0, baiA05_1.simulateTask)(1000);
Promise.all([task1, task2, task3])
    .then(results => console.log("Done", results));
