import axios from 'axios';
import { AxiosError } from 'axios';

const instance = axios.create();

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