import { mulByThree } from "./baiB14";

async function parallelCalls() {
    const promise1 = mulByThree(1)
    const promise2 = mulByThree(2)
    const result = await Promise.all([promise1, promise2])
    console.log(result)
}

parallelCalls()