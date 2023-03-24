const express = require('express');
const router = express.Router();
const passport = require('passport');

// Github OAuth
router.get(
    '/oauth2/authorization/github',
    passport.authenticate(
        'github',
        {
            scope: ['user:email']
        }
    )
);
// Github OAuth Callback
router.get(
    '/login/oauth2/code/github',
    passport.authenticate(
        'github',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }
    )
);

// Google OAuth
router.get(
    '/oauth2/authorization/google',
    passport.authenticate(
        'google',
        {
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
        }
    )
);
// Google OAuth Callback
router.get(
    '/login/oauth2/code/google',
    passport.authenticate(
        'google',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }
    )
);

// Kakao OAuth
router.get(
    '/oauth2/authorization/kakao',
    passport.authenticate(
        'kakao',
        {}
    )
);
// Kakao OAuth Callback
router.get(
    '/login/oauth2/code/kakao',
    passport.authenticate(
        'kakao',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }
    )
);

router.get('/api/security', (req, res, next) => {
    // req.user 가 null 일 경우, 로그인이 되지 않은 경우
    res.json(Object.assign({}, req.user));
});

router.post('/logout', function(req, res, next){
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;