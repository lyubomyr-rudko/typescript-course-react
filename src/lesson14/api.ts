import axios, {AxiosResponse} from "axios";
import {GetUsersResponse, IUser, IUserForm} from "./types.ts";
import {transformUserObjectFromForm} from "./utils.ts";

const BASE_URL = ' http://localhost:3004/users';
export function getUsers(): Promise<AxiosResponse<GetUsersResponse>> {
    return axios.get<GetUsersResponse>(BASE_URL + '?_sort=position');
}

function changePosition(id: number, position: number): Promise<AxiosResponse<IUser>> {
    return axios.patch<IUser>(`${BASE_URL}/${id}`,{position},{
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export type TUpdateUsersPositionsParams = [IUser, IUser]

async function updateUsersPositions(users: TUpdateUsersPositionsParams) {
    const promises = users.map(({id, position}: IUser) => changePosition(id, position))
    try {
        await Promise.all(promises)
    } catch (error) {
        console.log(error)
    }
}

export async function updateUserList(users: TUpdateUsersPositionsParams): Promise<AxiosResponse<GetUsersResponse>> {
    await updateUsersPositions(users)
    return  await getUsers()
}

export async function createUser(user: IUserForm, position: number):Promise<AxiosResponse<GetUsersResponse>> {
    const newUser = transformUserObjectFromForm(user, position)
    await axios.post<IUser>(`${BASE_URL}`,newUser,{
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await getUsers()
}
