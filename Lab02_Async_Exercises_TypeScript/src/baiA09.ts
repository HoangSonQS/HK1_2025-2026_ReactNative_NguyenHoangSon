function filterEvenNumbers(numbers: number[]): Promise<number[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filterNumbers = numbers.filter(number => number % 2 === 0)
            resolve(filterNumbers)
        }, 1000)
    })
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filterEvenNumbers(numbers).then(
    result => console.log("Filtered numbers (even numbers): ", result)
)