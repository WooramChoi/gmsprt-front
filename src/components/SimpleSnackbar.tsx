import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface SimpleSnackbarProps {
    message: string|null
    setMessage(message: string|null): void
}

const SimpleSnackbar = (props: SimpleSnackbarProps) => {

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
      
        props.setMessage(null);
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
            open={props.message != null}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={props.message}
            action={actionSnackbar} />
    )
}

export default SimpleSnackbar;