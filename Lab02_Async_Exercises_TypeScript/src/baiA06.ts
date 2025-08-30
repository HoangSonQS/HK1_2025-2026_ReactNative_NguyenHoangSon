import { simulateTask } from "./baiA05"

const task1 = simulateTask(1000)
const task2 = simulateTask(1000)
const task3 = simulateTask(1000)

Promise.all([task1, task2, task3])
.then(results => console.log("Done", results))