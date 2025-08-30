"use strict";
const randomNumberPromise = new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 101);
    if (randomNumber % 2 === 0)
        resolve(randomNumber);
    else
        reject("Không phải số chẳn");
});
console.log("Promise ngẫu nhiên resolve số chẵn");
randomNumberPromise.then(resolve => console.log("Ngẫu nhiên ra số chẵn: ", resolve))
    .catch(error => console.error("Error: ", error));
