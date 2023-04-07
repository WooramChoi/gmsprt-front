import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { openBackdropProgress } from '../components/BackdropProgress';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface ButtonOAuthProps {
    name: string,
    url: string,
    sx?: SxProps<Theme>,
    alt: string,
    icon: string
}

const ButtonOAuth = (props: ButtonOAuthProps) => {

    const setOpen = useSetRecoilState(openBackdropProgress);
    const handleUrl = () => {
        setOpen(true);
        window.location.href = props.url;
    }

    return (
        <Button
            fullWidth
            variant='outlined'
            sx={props.sx}
            onClick={handleUrl}
        >
            <Box
                component="img"
                sx={{
                    clipPath: 'circle( 20px at 20px 20px)',
                    marginRight: 'auto'
                }}
                alt={props.alt}
                src={props.icon}
            />
            <Typography variant='button' sx={{marginRight: 'auto', fontWeight: 700}}>{props.name}</Typography>
        </Button>
    );
}

export default ButtonOAuth;