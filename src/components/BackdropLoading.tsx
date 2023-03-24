import * as React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface BackdropLoadingProps {
    open: boolean
}

const BackdropLoading = (props: BackdropLoadingProps) => {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default BackdropLoading;