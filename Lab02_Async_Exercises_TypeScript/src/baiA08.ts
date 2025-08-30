const startPromise = Promise.resolve(2)

startPromise.then(num => num * num)
            .then(num => num * 2)
            .then(num => num + 5)
            .then(num => console.log(num))