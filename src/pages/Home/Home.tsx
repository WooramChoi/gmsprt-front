import * as React from 'react';
import { useCurrentUser } from '../../context/SecurityContext';

const Home = () => {

    const { currentUser } = useCurrentUser();

    return (
        <>
            <span>Hello, World!</span>
            <br/>
            <span>name:</span><span>{currentUser.name}</span>
        </>
    );
}

export default Home;