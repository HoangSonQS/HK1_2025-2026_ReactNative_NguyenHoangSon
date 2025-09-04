const promise = new Promise<String> ((resolve) => {
    resolve("Thành công")
})

promise.then(result => console.log(result))
.catch(error => console.log("Error"))
.finally(() => console.log("Done"))