import * as React from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import ButtonOAuth from '../../components/ButtonOAuth';
import iconGithub from '../../assets/SignIn/github-mark.png';
import iconGoogle from '../../assets/SignIn/google-mark.png';
import iconKakao from '../../assets/SignIn/kakao-mark.png';

const SignIn = () => {
    return (
        <Container maxWidth='sm'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant='subtitle1'>Sign in</Typography>
                </Box>
                <Box sx={{ mt: 3, width: '100%' }}>
                    <Stack spacing={2}>
                        <ButtonOAuth name='Github' url='/oauth2/authorization/github' icon={iconGithub} alt='github-mark' />
                        <ButtonOAuth name='Google' url='/oauth2/authorization/google' icon={iconGoogle} alt='google-mark' />
                        <ButtonOAuth
                            name='카카오 로그인'
                            url='/oauth2/authorization/kakao'
                            icon={iconKakao}
                            alt='kakao-mark'
                            sx={{
                                backgroundColor: '#fee500',
                                color: '#00000085',
                                border: '1px solid #fee500',
                                borderRadius: '12px',
                                '&:hover': {
                                    backgroundColor: '#fee500',
                                    color: '#00000085',
                                    border: '1px solid #d8c400',
                                }
                            }}
                        />
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;