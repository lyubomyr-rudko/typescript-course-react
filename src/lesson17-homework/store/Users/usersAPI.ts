import { TUser } from "./TUser"

export const USERS_API_BASE_URL = `http://localhost:3000/users`

export const usersAPI = {
    fetchById: async function (userId:string | number): Promise<TUser | null> {
        try{
            const response = await fetch(`${USERS_API_BASE_URL}/${userId}`)
            const data = await response.json()
            
            return data ? data as TUser : null
        } catch(e){
            console.error(`Something went wrong at "usersAPI.fetchById"`, e)
            return null
        }
    },
    fetchAllUsers: async function ():Promise<TUser[]>{
        try{
            const response = await fetch(USERS_API_BASE_URL)
            const data = await response.json()
            
            return data ? data as TUser[] : []
        } catch(e){
            console.error(`Something went wrong at "usersAPI.fetchAllUsers"`, e)
            return []
        }
    },
    deleteUserById:async function(userId:string|number):Promise<boolean> {
        try{
            const response = await fetch(`${USERS_API_BASE_URL}/${userId}`, {
                method:"DELETE"
            })
            
            return response.ok
        } catch(e){
            console.error(`Something went wrong at "usersAPI.deleteUserById"`, e)
            return false
        }
    }

}
