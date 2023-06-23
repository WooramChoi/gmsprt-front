import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios, { handleErrors } from '../../utils/AxiosSingleton';
import { dateToString } from '../../utils/DateUtils';
import { BoardSearch, BoardSummary } from '../../data/models';

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
    const [searchParams, setSearchParams] = useSearchParams();
    if (!searchParams.has('page')) {
        searchParams.set('page', '0');
    }
    if (!searchParams.has('size')) {
        searchParams.set('size', '6');
    }
    const page = parseInt(searchParams.get('page')!);
    const size = parseInt(searchParams.get('size')!);
    const name = searchParams.get('name');
    const toc = searchParams.get('toc');

    const [boardList, setBoardList] = React.useState([] as BoardSummary[]);
    const [totalPages, setTotalPages] = React.useState(1);

    React.useEffect(() => {
        axios({
            url: '/api/boards',
            method: 'get',
            params: {page: page, size: size, name: name, toc: toc, use: true, sort: 'seqBoard,desc'}
        })
        .then((response) => {
            setBoardList(response.data.content);
            setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
            handleErrors(error);
        });
    }, [page, size, name, toc]);

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        searchParams.set('page', (page-1).toString());
        setSearchParams(searchParams);

        const anchor = (
            (e.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    }

    const handleCardClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, seqBoard: number) => {
        navigate(`/boards/${seqBoard}?${searchParams.toString()}`);
    }

    const handleFabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/boards/0/form?${searchParams.toString()}`);
    }

    return (
        <Box id="back-to-top-anchor">
            <Grid container spacing={1}>
                {boardList.length > 0
                ? boardList.map((boardDetails, idx) => (
                    <Grid key={'boardDetails_' + idx} item xs={12} sm={6} md={4}>
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
                                    <Typography variant='body2' noWrap={true}>
                                        {boardDetails.contentSummary}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>))
                : <Grid item xs={12}><Typography variant='h4' align='center'>Empty</Typography></Grid>
                }
                <Grid item xs={12}>
                    <Stack alignItems={'center'}>
                        <Pagination count={totalPages} page={page + 1} color="primary" onChange={handlePageChange} />
                    </Stack>
                </Grid>
            </Grid>
            <Fab color='primary' aria-label='add' sx={{ position: 'fixed', bottom: 16, right: 16, }} onClick={handleFabClick}>
                <AddIcon />
            </Fab>
        </Box>
    );
}

export default BoardList