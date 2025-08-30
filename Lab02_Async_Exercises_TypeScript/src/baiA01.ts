const myPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("Hello Async")
    }, 2000)
})

myPromise.then(result => console.log(result))