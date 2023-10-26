import { TUser } from "./Users-homework";

export const API_BASE_URL = `http://localhost:3000`

export async function apiUserUpdateById(user:TUser){
    const url = `${API_BASE_URL}/users/${user.id}`;

    try{
        await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    } catch(e){
        console.error("In apiUserUpdateById")
    }
}

export async function apiUsersUpdateAll(users:TUser[]){
    for(const user of users){
        await apiUserUpdateById(user)
    }
}

export async function apiUserAddNew(user:TUser) {
    const url = `${API_BASE_URL}/users`;

    try{
        await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    } catch(e){
        console.error("In apiUserAddNew")
    }
}