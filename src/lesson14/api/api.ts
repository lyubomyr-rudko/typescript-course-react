import axios from 'axios';
import { IUsersProps, TUser } from '../types/types';

const BASE_URL = 'http://localhost:3000/users/';

class API {
    constructor(public BASE_URL: string) {}

    async getUsers(): Promise<IUsersProps | undefined> {
        try {
            return await axios.get(this.BASE_URL);
        } catch (error) {
            console.log(error);
        }
    }

    async updatePosition(
        id: TUser['id'],
        position: TUser['position']
    ): Promise<void> {
        try {
            await axios.patch(`${this.BASE_URL}${id}`, { position: position });
        } catch (error) {
            console.log(error);
        }
    }

    async addUser(formData: Omit<TUser, 'id'>): Promise<void> {
        try {
            await axios.post(`${this.BASE_URL}`, formData);
        } catch (error) {
            console.log(error);
        }
    }
}

export const api = new API(BASE_URL);
