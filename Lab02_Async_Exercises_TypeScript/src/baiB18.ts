interface User {
    id: number
    name: string
}

async function fetchUser(id: number): Promise<User> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User${id}` });
        }, 1000);
    });
}

fetchUser(1).then(user => console.log(user))