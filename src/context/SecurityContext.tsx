import * as React from 'react';
import axios from '../utils/AxiosSingleton';

export interface SecurityProfileVO {
    seqUserProfile?: number,
    sid?: string,
    uid?: string,
    name?: string,
    email?: string,
    urlPicture?: string
}

export interface SecurityVO {
    seqUser?: number,
    name?: string,
    email?: string,
    urlPicture?: string,
    profiles: SecurityProfileVO[]
}

// Type 을 지정해주기 위해 initial value 를 만들어줌
// 그러나 useReduce, Dispatch 를 사용하여 Action 을 전달받는게 좀더 올바른 형태 같음
export const SecurityContext = React.createContext({
    currentUser: {} as SecurityVO,
    fetchCurrentUser: () => {console.log('no')},
});

export const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
    const [ currentUser, setCurrentUser ] = React.useState<SecurityVO>({} as SecurityVO)

    const fetchCurrentUser = () => {
        axios.get('/api/security')
            .then(response => {
                // console.log('response.data:');
                // console.log(response.data);
                setCurrentUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <SecurityContext.Provider value={{currentUser, fetchCurrentUser}}>
            {children}
        </SecurityContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(SecurityContext)