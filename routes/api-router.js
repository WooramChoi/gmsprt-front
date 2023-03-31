const express = require('express');
const router = express.Router();
const axiosFactory = require('../module/axios-api-factory');

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

            res.json(error.response.data);
        } else if (error.request) {
            console.error(error.request);

            res.json(error.request);
        } else {
            console.error(error.message);

            res.json({message: error.message});
        }
    });
});

module.exports = router;