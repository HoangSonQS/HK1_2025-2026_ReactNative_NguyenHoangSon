async function getHelloAsync() {
    return "Hello Async"
}
async function main() {
    const result = await getHelloAsync()
    console.log(result)
}

main()
