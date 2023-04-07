import axios, { AxiosError } from 'axios';

const instance = axios.create({baseURL: 'http://127.0.0.1:3001/'});

export const handleErrors = (error: AxiosError) => {
    if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
    } else if (error.request) {
        console.error(error.request);
    } else {
        console.error(error.message);
    }
}

export default instance;