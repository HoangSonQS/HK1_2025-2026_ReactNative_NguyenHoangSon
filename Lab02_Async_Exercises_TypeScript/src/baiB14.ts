export async function mulByThree(num: number) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return num * 3
}
