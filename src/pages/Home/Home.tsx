import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'

const Home = () => {

    const navigate = useNavigate();

    const handleLink = () => {
        navigate('/boards');
    }

    return (
        <>
            <p>
                <span>Hello, World!</span>
            </p>
            <p>
                <Button
                    variant='outlined'
                    onClick={handleLink}
                >
                    게시판
                </Button>
            </p>
        </>
    );
}

export default Home;