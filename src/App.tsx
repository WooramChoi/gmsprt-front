import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { openBackdropProgress, progressBackdropProgress } from './components/BackdropProgress';
import axios from './utils/AxiosSingleton';
import { SecurityActions } from './utils/SecurityUtils';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import BackdropProgress from './components/BackdropProgress';
import Footer from './components/Footer';
import Header from './components/Header';

import BoardView from './pages/Board/BoardView';
import BoardForm from './pages/Board/BoardForm';
import BoardList from './pages/Board/BoardList';
import HomePage from './pages/Home/Home';
import SignInPage from './pages/SignIn/SignIn';
import NotFoundPage from './pages/errors/404/NotFound';

const App = () => {

    const { fetchCurrentUser } = SecurityActions();
    const setOpen = useSetRecoilState(openBackdropProgress);
    const setProgress = useSetRecoilState(progressBackdropProgress);

    // useEffect({function}, [emptyArray]) = componentDidMount = document.ready
    React.useEffect(() => {

        // 로그인된 유저 확인
        fetchCurrentUser();

        // Axios instance 의 interceptor 로 Backdrop - Loading 을 제어하도록함
        axios.interceptors.request.use(function (config) {
            setProgress(-1);
            setOpen(true);
            return config;
        }, function (error) {
            setOpen(false);
            return Promise.reject(error);
        });
        
        axios.interceptors.response.use(function (response) {
            setOpen(false);
            return response;
        }, function (error) {
            setOpen(false);
            return Promise.reject(error);
        });

    }, [fetchCurrentUser, setOpen, setProgress]);

    return (
        <>
            <CssBaseline />

            <BackdropProgress />

            <Header />

            <Container component="main" sx={{ mt: 8 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/boards" element={<BoardList />} />
                    <Route path="/boards/:seqBoard" element={<BoardView />} />
                    <Route path="/boards/:seqBoard/form" element={<BoardForm />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Container>

            <Footer />
        </>
    );
}

export default App;
