function simulateTask(time: number, nameTask: string): Promise<{status: string, nameTask: string}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ status: "Task done",nameTask: nameTask })
        }, time)
    })
}

const task1 = simulateTask(3000, "task1")
const task2 = simulateTask(2000, "task2")

Promise.race([task1, task2])
.then(results => console.log(results))