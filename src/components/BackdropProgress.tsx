import * as React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { CircularProgressProps } from '@mui/material/CircularProgress/CircularProgress';

interface BackdropProgressProps {
    open: boolean,
    progress: number
}

interface ProgressProps extends CircularProgressProps {
    value: number
}

const BackdropProgress = (props: BackdropProgressProps) => {

    const progressProps = { color: 'inherit' } as ProgressProps;
    if (props.progress >= 0) {
        progressProps.variant = 'determinate';
        progressProps.value = props.progress;
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <CircularProgress {...progressProps} />
        </Backdrop>
    );
}

export default BackdropProgress;