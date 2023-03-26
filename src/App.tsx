import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from './utils/AxiosSingleton';
import { useBackdropProgress } from './context/BackdropProgressContext'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from './components/Header';
import BackdropProgress from './components/BackdropProgress';

import HomePage from './pages/Home/Home';
import SignInPage from './pages/SignIn/SignIn';
import NotFoundPage from './pages/errors/404/NotFound';

const App = () => {

    const { open, changeOpen, progress, changeProgress } = useBackdropProgress();
    // useEffect({function}, [emptyArray]) = componentDidMount = document.ready
    React.useEffect(() => {

        // Axios instance 의 interceptor 로 Backdrop - Loading 을 제어하도록함
        axios.interceptors.request.use(function (config) {
            changeProgress(-1);
            changeOpen(true);
            return config;
        }, function (error) {
            changeOpen(false);
            return Promise.reject(error);
        });
        
        axios.interceptors.response.use(function (response) {
            changeOpen(false);
            return response;
        }, function (error) {
            changeOpen(false);
            return Promise.reject(error);
        });

    }, []);

    return (
        <Container component="main">
            <CssBaseline />

            <BackdropProgress open={open} progress={progress}/>

            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* footer */}

        </Container>
    );
}

export default App;
