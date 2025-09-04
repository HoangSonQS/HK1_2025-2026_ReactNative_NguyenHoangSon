import { fetchUser } from "./baiB18";

async function fetchWithTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
    const timeoutPromise = new Promise<T>((_, reject) => {
        setTimeout(() => {
            reject(new Error("API call timed out"))
        }, timeout)
    })
    return Promise.race([promise, timeoutPromise])
}

async function getUserWithTimeout(id: number) {
    try {
        const user = await fetchWithTimeout(fetchUser(id), 999); //timeout cua fetchUser duoc cai la 1000
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}

getUserWithTimeout(1);