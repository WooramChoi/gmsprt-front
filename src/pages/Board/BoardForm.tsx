import * as React from 'react';
import axios from '../../utils/AxiosSingleton';
import { handleErrors } from '../../utils/AxiosSingleton';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const BoardForm = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); };

    const params = useParams();
    const [seqBoard, setSeqBoard] = React.useState(0);
    const [title, setTitle] = React.useState('');
    const [name, setName] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [content, setContent] = React.useState('');

    React.useEffect(() => {
        console.log('useEffect, default');
        setSeqBoard(+params.seqBoard!);
        console.log(`seqBoard: ${seqBoard}`);
    }, [])

    React.useEffect(() => {
        console.log(`useEffect, seqBoard change: ${seqBoard}`);
        axios.get(`/api/boards/${seqBoard}`)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            setTitle(response.data.title);
            setName(response.data.name);
            setPwd('');
            setContent(response.data.content);
        })
        .catch(handleErrors);
    }, [seqBoard]);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let config = {
            url: e.currentTarget.action,
            method: e.currentTarget.method,
            data: {
                title: title,
                name: name,
                pwd: pwd,
                content: content
            }
        }
        if (seqBoard > 0) {
            config['url'] = config['url'] + `/${seqBoard}`;
            config['method'] = 'patch';
        }

        axios(config)
        .then((response) => {
            setSeqBoard(response.data.seqBoard);
        })
        .catch((error) => {
            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error(error.message);
            }
        });

        return false;
    }

    return (
        <Box
            component='form'
            sx={{ mt: 8 }}
            method='post'
            action='/api/boards'
            onSubmit={handleOnSubmit}
        >
            <input type='hidden' id='seqBoard' name='seqBoard' value={seqBoard} />
            <Grid container>
                <Grid item md={4} sm={12} xs={12} sx={{ p: 1 }}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            id='idTitle'
                            name='title'
                            label='제목'
                            value={title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTitle(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={4} sm={6} xs={12} sx={{ p: 1 }}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            id='idName'
                            name='name'
                            label='이름'
                            value={name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={4} sm={6} xs={12} sx={{ p: 1 }}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            id='idPwd'
                            name='pwd'
                            label='비밀번호'
                            value={pwd}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPwd(event.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ p: 1 }}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            id='idContent'
                            name='content'
                            label='내용'
                            value={content}
                            multiline
                            minRows={5}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setContent(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ p: 1 }}>
                    <Button
                        type='submit'
                    >
                        제출
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BoardForm;