import * as React from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useHotkeys } from 'react-hotkeys-hook'
import { currentUserState, SecurityActions } from '../utils/SecurityUtils';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'inherit'
}));

const Header = () => {

    const currentUser = useRecoilValue(currentUserState);
    const { fetchCurrentUser, logout } = SecurityActions();

    // Drawer
    const [state, setState] = React.useState({
        drawer: false
    });
    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, drawer: open });
        };
    
    // Profile & Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';
    const navigate = useNavigate();

    interface profileMenuItem {
        handler: React.MouseEventHandler<HTMLLIElement>,
        text: string
    }
    const menuProfile = () => {
        const profileMenuItems: profileMenuItem[] = [];
        if (currentUser.seqUser) {
            profileMenuItems.push({ handler: handleMenuClose, text: 'Profile' });
            profileMenuItems.push({ handler: fetchCurrentUser, text: 'My account' });
            profileMenuItems.push({ handler: handleSignOut, text: 'Sign Out' });
        } else {
            profileMenuItems.push({ handler: handleSignIn, text: 'Sign In' });
        }
        return (
            profileMenuItems.map((profileMenuItem, idx) => {
                return <MenuItem key={'profileMenuItem_'+idx} onClick={profileMenuItem.handler}>{profileMenuItem.text}</MenuItem>
            })
        )
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };

    const handleSignIn = () => {
        handleMenuClose();
        navigate('/login');
    }

    const handleSignOut = () => {
        handleMenuClose();
        logout();
    }

    // StyledInputBase
    const [searchParams] = useSearchParams();
    const inputSearch = React.useRef<HTMLInputElement>(null);
    useHotkeys('/', (event: KeyboardEvent) => {
        event.preventDefault();
        inputSearch.current?.focus();
        inputSearch.current?.select();
    }, []);

    const toc = searchParams.get('toc');
    const [strSearch, setStrSearch] = React.useState<string>(toc?toc:'');
    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch(event.key) {
            case 'Enter': navigate('/boards?toc=' + strSearch); break;
            case 'Escape': setStrSearch(''); break;
            default: break;
        }
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStrSearch(event.target.value);
    }

    return (
        <Box component='header' sx={{ flexGrow: 1 }}>

            <Drawer
                anchor='left'
                open={state['drawer']}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem key='Inbox' disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary='Inbox' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key='All mail' disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary='All mail' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <StyledLink to='/'>
                            MUI
                        </StyledLink>
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            inputRef={inputSearch}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={strSearch}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        {currentUser.urlPicture
                            ? <Avatar alt={currentUser.name} src={currentUser.urlPicture}/>
                            : <AccountCircle />
                        }
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {menuProfile()}
            </Menu>

        </Box>
    );
}

export default Header;