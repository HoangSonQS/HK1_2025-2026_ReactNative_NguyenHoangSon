import { mulByThree } from "./baiB14";

async function sequentialCalls() {
    const result1 = await mulByThree(15)
    console.log(result1)
    const result2 = await mulByThree(result1)
    console.log(result2)
}

sequentialCalls()