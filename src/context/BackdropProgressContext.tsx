import * as React from 'react';

export const BackdropProgressContext = React.createContext({
    open: false,
    changeOpen: (open: boolean) => {},
    progress: 0,
    changeProgress: (progress: number) => {}
});

export const BackdropProgressProvider = ({ children }: { children: React.ReactNode }) => {

    const [ open, setOpen ] = React.useState(false);
    const changeOpen = (open: boolean) => {
        setOpen(open);
    }

    const [ progress, setProgress ] = React.useState(0);
    const changeProgress = (progress: number) => {
        setProgress(progress);
    }

    return (
        <BackdropProgressContext.Provider value={{open, changeOpen, progress, changeProgress}}>
            {children}
        </BackdropProgressContext.Provider>
    )
}

export const useBackdropProgress = () => React.useContext(BackdropProgressContext);