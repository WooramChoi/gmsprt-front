import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SecurityProvider } from './context/SecurityContext';
import axios from './utils/AxiosSingleton';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './components/Header';
import BackdropLoading from './components/BackdropLoading';

import HomePage from './pages/Home/Home';
import SignInPage from './pages/SignIn/SignIn';
import NotFoundPage from './pages/errors/404/NotFound';

const theme = createTheme();

const App = () => {

    const [ openBackdropLoading, setOpenBackdropLoading ] = React.useState(false);
    // useEffect({function}, [emptyArray]) = componentDidMount = document.ready
    React.useEffect(() => {

        // Axios instance 의 interceptor 로 Backdrop - Loading 을 제어하도록함
        axios.interceptors.request.use(function (config) {
            setOpenBackdropLoading(true);
            return config;
        }, function (error) {
            setOpenBackdropLoading(false);
            return Promise.reject(error);
        });
        
        axios.interceptors.response.use(function (response) {
            setOpenBackdropLoading(false);
            return response;
        }, function (error) {
            setOpenBackdropLoading(false);
            return Promise.reject(error);
        });

    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SecurityProvider>
                <Container component="main">
                    <CssBaseline />

                    <BackdropLoading open={openBackdropLoading}/>

                    <Header />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<SignInPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>

                    {/* footer */}

                </Container>
            </SecurityProvider>
        </ThemeProvider>
    );
}

export default App;
