import { rejectAfterOneSecond } from "./baiA03"

async function handleError() {
    try {
        const result = await rejectAfterOneSecond()
        console.log(result)
    } catch (error) {
        console.log("Lỗi async/await: ", error)
    }
}

handleError()