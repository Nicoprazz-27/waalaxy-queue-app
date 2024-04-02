import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../utils/constants';

export const getRequest = async (path: string): Promise<AxiosResponse<any>> => {
    try {
        const response: AxiosResponse = await axios.get(SERVER_URL + path);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } 
}
