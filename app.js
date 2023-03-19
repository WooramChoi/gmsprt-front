const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('./module/passport-wrapper');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use(session({
    key: 'sid',
    secret: 'gmsprt-front',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000,
        httpOnly: true
    },
    rolling: true
}));
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use('/', apiRouter);

// SPA 목적으로, 모든 요청에 대해 index.html 을 렌더링
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, './build/', 'index.html'));
});

// error handler
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(err.status || 500);
    if(req.accepts(['html', 'json']) === 'json'){
        res.json({ message: err.message });
    }else{
        res.sendFile(path.join(__dirname, './build/', 'index.html'));
    }
});

module.exports = app;
