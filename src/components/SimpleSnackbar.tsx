import * as React from 'react';
import { atom, useRecoilState } from 'recoil';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const messageSimpleSnackbar = atom<string|null>({
    key: 'messageSimpleSnackbar',
    default: null
});

const SimpleSnackbar = () => {

    const [message, setMessage] = useRecoilState(messageSimpleSnackbar);

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setMessage(null);
    }

    const actionSnackbar = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={message != null}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={message}
            action={actionSnackbar} />
    )
}

export default SimpleSnackbar;