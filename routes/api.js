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

router.get('/search/me', (req, res, next) => {
    // req.user 가 null 일 경우, 로그인이 되지 않은 경우
    const currentUser = Object.assign({}, req.user);

    // 민감한(화면에 불필요한) 데이터들은 제거
    delete currentUser.googleId;
    delete currentUser.googleAccessToken;
    delete currentUser.googleRefreshToken;
    delete currentUser.kakaoId;
    delete currentUser.kakaoAccessToken;
    delete currentUser.kakaoRefreshToken;

    res.json(currentUser);
});

module.exports = router;