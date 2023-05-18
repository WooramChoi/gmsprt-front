import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios, { handleErrors } from '../../utils/AxiosSingleton';
import { dateToString } from '../../utils/DateUtils';
import { BoardSearch, BoardDetails } from '../../data/models';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Card, CardHeader, CardMedia, CardContent, CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import Pagination from '@mui/material/Pagination';

import { Add as AddIcon } from '@mui/icons-material';


const BoardList = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lastSearch = React.useRef('');

    const [boardSearch, setBoardSearch] = React.useState({
        page: parseInt(searchParams.has('page')? searchParams.get('page')! : '0'),
        size: parseInt(searchParams.has('size')? searchParams.get('size')! : '12'),
        name: searchParams.get('name'),
        toc: searchParams.get('toc'),
        use: searchParams.has('use')? (searchParams.get('use')! === 'true') : true
    } as BoardSearch);

    const [boardList, setBoardList] = React.useState([] as BoardDetails[]);
    const [page, setPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(1);

    React.useEffect(() => {

        console.log('boardSearch changed');

        const params = new URLSearchParams();
        params.set('page', (boardSearch.page || '0').toString());
        params.set('size', (boardSearch.size || '12').toString());
        params.set('name', boardSearch.name || '');
        params.set('toc', boardSearch.name || '');
        params.set('use', (boardSearch.use || 'true').toString());

        navigate(`/boards?${params.toString()}`);

    }, [boardSearch, navigate]);

    React.useEffect(() => {

        if (location.search !== '' && location.search !== lastSearch.current) {

            console.log(`location changed: ${location.search}`);
            lastSearch.current = location.search;

            axios({
                url: '/api/boards',
                method: 'get',
                params: new URLSearchParams(location.search)
            })
            .then((response) => {
                console.log(response.data);
                setBoardList(response.data.content);
                setPage(response.data.number);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                handleErrors(error);
            });
        }

    }, [location]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBoardSearch((prevState) => {
            return { ...prevState, page: 0 }
        });
    }

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setBoardSearch((prevState) => {
            return { ...prevState, page: (page - 1) }
        });
    }

    const handleCardClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, seqBoard: number) => {
        navigate(`/boards/${seqBoard}/form`);
    }

    const handleFabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate('/boards/0/form');
    }

    return (
        <Box>
            <Grid container>
                {boardList.map((boardDetails, idx) => (
                    <Grid key={'boardDetails_' + idx} item xs={12} sm={6} md={4} sx={{ pt: 2, pr: 1,  pb: 2, pl: 1 }}>
                        <Card>
                            <CardActionArea
                                onClick={(e) => handleCardClick(e, boardDetails.seqBoard!)}
                            >
                                <CardHeader
                                    avatar={boardDetails.user
                                        ? <Avatar alt={boardDetails.user.name} src={boardDetails.user.urlPicture}/>
                                        : <Avatar>U</Avatar>
                                    }
                                    title={boardDetails.title}
                                    subheader={dateToString(boardDetails.dtCreate)}
                                />
                                <Skeleton variant='rounded' height={200}/>
                                <CardContent>
                                    <Typography variant='body2'>
                                        {boardDetails.content?.substring(0, 20)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Stack alignItems={'center'}>
                <Pagination count={totalPages} page={page! + 1} color="primary" onChange={handlePageChange} />
            </Stack>
            <Fab color='primary' aria-label='add' sx={{ position: 'fixed', bottom: 16, right: 16, }} onClick={handleFabClick}>
                <AddIcon />
            </Fab>
        </Box>
    );
}

export default BoardList