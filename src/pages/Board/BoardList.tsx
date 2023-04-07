import * as React from 'react';
import axios, { handleErrors } from '../../utils/AxiosSingleton';
import { BoardSearch, BoardDetails } from '../../data/models';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material';
import Pagination from '@mui/material/Pagination';


const BoardList = () => {

    const [boardSearch, setBoardSearch] = React.useState({
        page: 0,
        size: 6,
        use: true
    } as BoardSearch);
    const [boardList, setBoardList] = React.useState([] as BoardDetails[]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [name, setName] = React.useState('');
    const [toc, setToc] = React.useState('');

    React.useEffect(() => {
        axios({
            url: '/api/boards',
            method: 'get',
            params: boardSearch
        })
            .then((response) => {
                setBoardList(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                handleErrors(error);
            });
    }, [boardSearch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setBoardSearch((prevState) => {
            return {
                ...prevState, page: 0,
                toc: toc, name: name
            }
        });
    }

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setBoardSearch((prevState) => {
            return { ...prevState, page: (page - 1) }
        });
    }

    const handleSizeChange = (e: SelectChangeEvent<unknown>, child: React.ReactNode) => {
        setBoardSearch((prevState) => {
            return {
                ...prevState, page: 0,
                size: (e.target.value as number)
            }
        });
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper sx={{ mt: 2, p: 2 }}>
                    <Box
                        component='form'
                        method='get'
                        action='/api/boards'
                        onSubmit={handleSubmit}
                    >
                        <FormControl variant='outlined'>
                            <InputLabel id="size-label">Size</InputLabel>
                            <Select
                                labelId='size-label'
                                id='size'
                                name='size'
                                label='Size'
                                value={boardSearch.size}
                                onChange={handleSizeChange}
                            >
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={18}>18</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" sx={{ pl: 2 }}>
                            <TextField
                                id='name'
                                name='name'
                                label='이름'
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }}
                            />
                        </FormControl>

                        <FormControl variant="outlined" sx={{ pl: 2 }}>
                            <TextField
                                id='toc'
                                name='toc'
                                label='제목/내용'
                                value={toc}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setToc(event.target.value);
                                }}
                            />
                        </FormControl>

                        <Box component='div' sx={{textAlign: 'right'}}>
                            <Button type='submit' variant='outlined'>검색</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            {boardList.map(boardDetails => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ pt: 2, pr: 1,  pb: 2, pl: 1 }}>
                    <Card>
                        <CardHeader>Header!</CardHeader>
                        <CardContent>{boardDetails.title}</CardContent>
                        <CardActions></CardActions>
                    </Card>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Stack alignItems={'center'}>
                    <Pagination count={totalPages} page={boardSearch.page! + 1} color="primary" onChange={handlePageChange} />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default BoardList