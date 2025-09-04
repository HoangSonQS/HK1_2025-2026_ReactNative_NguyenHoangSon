import { fetchUser } from "./baiB18"
import { User } from "./baiB18"

async function fetchUsers(ids: number[]): Promise<User[]> {
    const promises = ids.map(id => fetchUser(id))
    return Promise.all(promises)    
}

fetchUsers([1, 2, 3]).then(users => console.log(users))