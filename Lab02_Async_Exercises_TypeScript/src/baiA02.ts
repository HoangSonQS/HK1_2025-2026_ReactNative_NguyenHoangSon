function resolveAfterOneSecond(): Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(10)
        }, 1000)
    })
}

resolveAfterOneSecond().then(num => console.log(num))