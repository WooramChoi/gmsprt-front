import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from './utils/AxiosSingleton';
import { useCurrentUser } from './context/SecurityContext';
import { useBackdropProgress } from './context/BackdropProgressContext';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from './components/Header';
import BackdropProgress from './components/BackdropProgress';

import HomePage from './pages/Home/Home';
import SignInPage from './pages/SignIn/SignIn';
import BoardForm from './pages/Board/BoardForm';
import NotFoundPage from './pages/errors/404/NotFound';

const App = () => {

    const { fetchCurrentUser } = useCurrentUser();
    const { open, changeOpen, progress, changeProgress } = useBackdropProgress();

    // useEffect({function}, [emptyArray]) = componentDidMount = document.ready
    React.useEffect(() => {

        // 로그인된 유저 확인
        fetchCurrentUser();

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
                <Route path="/boards/:seqBoard" element={<div>Test...</div>} />
                <Route path="/boards/:seqBoard/form" element={<BoardForm />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* footer */}

        </Container>
    );
}

export default App;
