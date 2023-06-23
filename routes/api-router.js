const express = require('express');
const router = express.Router();
const axiosFactory = require('../module/axios-api-factory');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

/*
    파일 다운로드 전용
*/
router.get('/files/download/*', (req, res, next) => {
    console.log('# Call GET File API #');
    console.log(`req.url: ${req.url}`);

    const axios = axiosFactory(req.user);
    axios.get(req.url, { responseType: 'stream' })
    .then((response) => {
        response.data.pipe(res);
    })
    .catch((error) => {
        if (error.response) {
            console.error(error.response.status);
            // console.error(error.response.data);

            // res.status(error.response.status).json(error.response.data);
            // error.response.data.pipe(res); // encoding 문제로 한글이 깨짐
            res.status(error.response.status).end();
        } else if (error.request) {
            console.error(error.request);

            res.status(500).json(error.request);
        } else {
            console.error(error.message);

            res.status(500).json({message: error.message});
        }
    });
});

/*
    파일 업로드 전용
    multipart/form-data 형식으로 수신,
    api 에 application/json 과 multipart/form-data 형식으로 요청
*/
router.post('/files', upload.single('blobFile'), (req, res, next) => {
    console.log('# Call POST File API #');

    let formData = new FormData();
    formData.append('fileInfo', new Blob([JSON.stringify({refTable: req.body.refTable})], { type: 'application/json' }));
    formData.append('file', new Blob([req.file.buffer]), req.file.originalname);

    const axios = axiosFactory(req.user);
    axios.post('/files', formData, { headers: {'Content-Type': 'multipart/form-data'} })
    .then((response) => {
        res.json(response.data);
    })
    .catch((error) => {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);

            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            console.error(error.request);

            res.status(500).json(error.request);
        } else {
            console.error(error.message);

            res.status(500).json({message: error.message});
        }
    });
});

/*
    API Router
    요청을 Bypass 시킴
*/
router.all('/*', (req, res, next) => {

    console.log('# Call API #');
    console.log(`method: ${req.method}`);
    console.log(`url: ${req.url}`);
    let url = req.url;
    if (url.indexOf('?')>0) {
        url = url.substring(0, url.indexOf('?'));
        console.log(`substring url: ${url}`);
    }

    const axios = axiosFactory(req.user);
    let config = {
        url: url,
        method: req.method
    };
    if ( req.method === 'GET' ) {
        console.log(`query: ${JSON.stringify(req.query)}`);
        config['params'] = req.query;
    } else {
        console.debug(`body: ${JSON.stringify(req.body)}`);
        config['data'] = req.body;
    }

    axios(config)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error) => {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);

            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            console.error(error.request);

            res.status(500).json(error.request);
        } else {
            console.error(error.message);

            res.status(500).json({message: error.message});
        }
    });
});

module.exports = router;