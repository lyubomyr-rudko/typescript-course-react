import axios, {AxiosResponse} from "axios";
import {GetUsersResponse, IUser} from "./types.ts";

const BASE_URL = ' http://localhost:3004/users';
export function getUsers(): Promise<AxiosResponse<GetUsersResponse>> {
    return axios.get<GetUsersResponse>(BASE_URL + '?_sort=position');
}

export function deleteUser(id: number): Promise<AxiosResponse<IUser>> {
    return axios.delete(`${BASE_URL}/${id}`)
}

export function likeUser(id: number, likeNumber: number): Promise<AxiosResponse<IUser>> {
    return axios.patch<IUser>(`${BASE_URL}/${id}`,{likes: {numbers: likeNumber}},{
        headers: {
            "Content-Type": "application/json"
        }
    })
}
