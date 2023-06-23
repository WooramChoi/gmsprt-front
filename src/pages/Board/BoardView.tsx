import * as React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios, { handleErrors } from '../../utils/AxiosSingleton';
import { dateToString } from '../../utils/DateUtils';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { ContentState, EditorState, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const BoardView = () => {

    const params = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [seqBoard] = React.useState(() => +params.seqBoard!);
    const [title, setTitle] = React.useState('');
    // TODO 로그인된 유저는 이름과 비밀번호란이 필요없다. 그래도 이름은 히스토리성으로 남겨둘까?
    const [name, setName] = React.useState('');
    const [dtCreate, setDtCreate] = React.useState('');
    const [dtUpdate, setDtUpdate] = React.useState('');

    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    React.useEffect(() => {
        if (seqBoard > 0) {
            axios.get(`/api/boards/${seqBoard}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setName(response.data.name);
                    setDtCreate(dateToString(response.data.dtCreate));
                    setDtUpdate(dateToString(response.data.dtUpdate));
                    
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
        } else { 
            navigate(`/boards/0/form`, { replace: true });
        }
    }, [seqBoard, navigate]);

    const handleListClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/boards?${searchParams.toString()}`);
    }

    const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/boards/${seqBoard}/form`);
    }

    return (
        <Grid container justifyContent='center' alignItems='center' spacing={1}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h4' gutterBottom={true}>{title}</Typography>
                    <Typography variant='body2' align='right'>writed by: {name}</Typography>
                    <Typography variant='body2' align='right'>writed at: {dtCreate}</Typography>
                    <Typography variant='body2' align='right'>updated at: {dtUpdate}</Typography>
                    <hr/>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbarHidden={true}
                        readOnly={true}
                        locale='ko' // TODO 동적 적용
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}></Grid>
            <Grid item xs={6} md={2}>
                <Button variant='contained' size='large' fullWidth={true} onClick={handleListClick}>
                    목록
                </Button>
            </Grid>
            <Grid item xs={6} md={2}>
                <Button variant='contained' size='large' fullWidth={true} onClick={handleUpdateClick} sx={{ ml: 1 }}>
                    편집
                </Button>
            </Grid>
        </Grid>
    );
}

export default BoardView;