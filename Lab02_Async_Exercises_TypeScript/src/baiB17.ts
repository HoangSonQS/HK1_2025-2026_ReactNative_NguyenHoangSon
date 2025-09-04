import { mulByThree } from "./baiB14";

async function iteratePromise() {
    const promises = [mulByThree(1), mulByThree(2)]
    for await (const result of promises) {
        console.log(result)
    }
}

iteratePromise()