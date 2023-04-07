import * as React from 'react';
import { atom, useRecoilValue } from 'recoil';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { CircularProgressProps } from '@mui/material/CircularProgress/CircularProgress';

export const openBackdropProgress = atom({
    key: 'openBackdropProgress',
    default: false
});

export const progressBackdropProgress = atom({
    key: 'progressBackdropProgress',
    default: -1
});

interface ProgressProps extends CircularProgressProps {
    value: number
}

const BackdropProgress = () => {

    const open = useRecoilValue(openBackdropProgress);
    const progress = useRecoilValue(progressBackdropProgress);

    const progressProps = { color: 'inherit' } as ProgressProps;
    if (progress >= 0) {
        progressProps.variant = 'determinate';
        progressProps.value = progress;
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress {...progressProps} />
        </Backdrop>
    );
}

export default BackdropProgress;