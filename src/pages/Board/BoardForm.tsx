import * as React from 'react';
import axios, { handleErrors } from '../../utils/AxiosSingleton';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FieldError } from '../../data/models';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const BoardForm = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); };

    const params = useParams();
    const navigate = useNavigate();
    const [seqBoard] = React.useState(() => +params.seqBoard!);
    const [title, setTitle] = React.useState('');
    // TODO 로그인된 유저는 이름과 비밀번호란이 필요없다. 그래도 이름은 히스토리성으로 남겨둘까?
    const [name, setName] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    // const [content, setContent] = React.useState('');

    const [titleError, setTitleError] = React.useState<string|null>(null);
    const [nameError, setNameError] = React.useState<string|null>(null);
    const [pwdError, setPwdError] = React.useState<string|null>(null);
    // const [contentError, setContentError] = React.useState<string|null>(null);

    const {enqueueSnackbar} = useSnackbar();

    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const uploadCallback = (blobFile: Blob) => {
        return new Promise((resolve, reject) => {

            let formData = new FormData();
            formData.append('refTable', 'BOARD_INFO');
            formData.append('blobFile', blobFile);
            
            // TODO react.axios -> express.api 전송한 데이터를 헤더까지 온전히 spring.api 로 보내야함
            // node express 없애고 next.js 로 옮기는게 맞아보이는데...
            axios.post('/api/files', formData, { headers: {'Content-Type': 'multipart/form-data'} })
                .then((response) => {
                    // TODO node express 와 react 를 따로 돌리고 있어서 다른 도메인을 세팅해야했다. 실제론 필요없음
                    resolve({ data: { link: `${process.env.REACT_APP_BASE_URL}/api/files/download/${response.data.alias}.${response.data.ext}` } });
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });

        });
    }

    React.useEffect(() => {
        if (seqBoard > 0) {
            axios.get(`/api/boards/${seqBoard}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setName(response.data.name);
                    setPwd('');
                    // setContent(response.data.content);
                    
                    let rawContent: ContentState;
                    try {
                        rawContent = convertFromRaw(JSON.parse(response.data.content));
                    }catch(e){
                        console.warn('content is invalid Raw or not JSON');
                        rawContent = ContentState.createFromText(response.data.content);
                    }
                    setEditorState(EditorState.createWithContent(rawContent));
                })
                .catch(handleErrors);
        }
    }, [seqBoard]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let config = {
            url: '/api/boards',
            method: 'post',
            data: {
                title: title,
                name: name,
                pwd: pwd,
                content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                plainText: editorState.getCurrentContent().getPlainText(),
            }
        }
        if (seqBoard > 0) {
            config['url'] = `/api/boards/${seqBoard}`;
            config['method'] = 'patch';
        }

        axios(config)
            .then((response) => {
                enqueueSnackbar('저장되었습니다', {variant: 'success'});
                setPwd('');
                navigate(`/boards/${response.data.seqBoard}`);
            })
            .catch((error) => {
                if (error.response) {
                    // console.error(error.response.status);
                    enqueueSnackbar(error.response.data.message, {variant: 'error'});
                    if (Array.isArray(error.response.data.errors)) {
                        error.response.data.errors.forEach((fieldError: FieldError, idx: number) => {
                            switch(fieldError.field){
                                case 'title': setTitleError(fieldError.reason); break;
                                case 'name': setNameError(fieldError.reason); break;
                                case 'pwd': setPwdError(fieldError.reason); break;
                                case 'content':
                                case 'plainText': enqueueSnackbar(fieldError.reason, {variant: 'error'}); break;
                                default: console.error(fieldError); break;
                            }
                        });
                    }
                } else if (error.request) {
                    // console.error(error.request);
                    enqueueSnackbar(error.request, {variant: 'error'});
                } else {
                    // console.error(error.message);
                    enqueueSnackbar(error.message, {variant: 'error'});
                }
            });

        return false;
    }

    const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(-1);
    }

    return (
        <Box
            component='form'
            method='post'
            action='/api/boards'
            onSubmit={handleSubmit}
        >
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
                <Grid item xs={12} sx={{ p: 1 }}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            id='title'
                            name='title'
                            label='제목'
                            value={title}
                            error={titleError != null}
                            helperText={titleError}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTitle(event.target.value);
                                setTitleError(null);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Paper variant='outlined' sx={{ p: 2 }}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            toolbarStyle={{ border: 'none' }}
                            editorStyle={{ minHeight: '300px', borderTop: '1px solid rgb(196 196 196)' }}
                            toolbar={{
                                image: {
                                    uploadCallback: uploadCallback
                                }
                            }}
                            locale='ko' // TODO 동적 적용
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            id='name'
                            name='name'
                            label='이름'
                            value={name}
                            error={nameError != null}
                            helperText={nameError}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                                setNameError(null);
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            id='pwd'
                            name='pwd'
                            label='비밀번호'
                            value={pwd}
                            error={pwdError != null}
                            helperText={pwdError}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPwd(event.target.value);
                                setPwdError(null);
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
                <Grid item xs={6} md={2}>
                    <Button
                        variant='outlined'
                        size='large'
                        fullWidth={true}
                        onClick={handleCancelClick}
                    >
                        취소
                    </Button>
                </Grid>
                <Grid item xs={6} md={2}>
                    <Button
                        type='submit'
                        variant='contained'
                        size='large'
                        fullWidth={true}
                    >
                        제출
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BoardForm;