const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const axios = require('axios');

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GithubStrategy({
        clientID: 'b0dd59d6a6d51a4f9a91',
        clientSecret: '0c97a3cf9ebc9b2d77cf25571e541c795fb1c876',
        callbackURL: (process.env.LOCATION_ORIGIN || 'http://127.0.0.1:3000') + '/login/oauth2/code/github'
    },
    function(accessToken, refreshToken, profile, done) {
        return verify('github', accessToken, refreshToken, profile, done);
    }
));

passport.use(new GoogleStrategy({
        clientID: '958383583142-dgnt2ae153rgc6ah8leq7fcnqraiafr7.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: (process.env.LOCATION_ORIGIN || 'http://127.0.0.1:3000') + '/login/oauth2/code/google'
    },
    function(accessToken, refreshToken, profile, done) {
        return verify('google', accessToken, refreshToken, profile, done);
    }
));

passport.use(new KakaoStrategy({
        clientID : 'a3058b3fc38998773ab5d70f90061358',
        clientSecret: 'U6FBllQfM8HXBpbdzp0FLX3hIxvr7AeN', // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL : (process.env.LOCATION_ORIGIN || 'http://127.0.0.1:3000') + '/login/oauth2/code/kakao'
    },
    function(accessToken, refreshToken, profile, done){
        return verify('kakao', accessToken, refreshToken, profile, done);
    }
));

function verify(registrationId, accessToken, refreshToken, profile, cb) {
    console.log(`registrationId: ${registrationId}`);
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.debug('profile:');
    console.debug(profile);

    axios.get('http://127.0.0.1:8080/security/login',{
        headers: {
            'RegistrationId': registrationId,
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(function(response) {
        console.debug('response:');
        console.debug(response);
        return cb(null, response.data);
    }).catch(function(error) {
        console.error(error);
        return cb(error);
    });
    
}

module.exports = passport;