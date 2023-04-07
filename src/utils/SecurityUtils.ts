import { atom, useSetRecoilState } from 'recoil';
import axios from './AxiosSingleton';

export interface SecurityProfileDetails {
    seqUserProfile?: number,
    sid?: string,
    uid?: string,
    name?: string,
    email?: string,
    urlPicture?: string
}

export interface SecurityDetails {
    seqUser?: number,
    name?: string,
    email?: string,
    urlPicture?: string,
    profiles: SecurityProfileDetails[]
}

export const currentUserState = atom({
    key: 'currentUserState',
    default: {} as SecurityDetails
});

export const SecurityActions = () => {

    const setCurrentUser = useSetRecoilState(currentUserState);

    const fetchCurrentUser = () => {
        axios.get('/security')
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const logout = () => {
        axios.post('/logout')
        .then((response) => {
            console.log('logout done');
            fetchCurrentUser();
        })
        .catch((error) => {
            console.log('error');
            console.error(error);
        });
    }

    return {
        fetchCurrentUser,
        logout
    };
}