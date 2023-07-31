const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const axiosFactory = require('./axios-api-factory');

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GithubStrategy({
        clientID: '',
        clientSecret: '',
        callbackURL: (process.env.LOCATION_ORIGIN || 'http://127.0.0.1:3000') + '/login/oauth2/code/github'
    },
    function(accessToken, refreshToken, profile, done) {
        return verify('github', accessToken, refreshToken, profile, done);
    }
));

passport.use(new GoogleStrategy({
        clientID: '',
        clientSecret: '',
        callbackURL: (process.env.LOCATION_ORIGIN || 'http://127.0.0.1:3000') + '/login/oauth2/code/google'
    },
    function(accessToken, refreshToken, profile, done) {
        return verify('google', accessToken, refreshToken, profile, done);
    }
));

passport.use(new KakaoStrategy({
        clientID : '',
        clientSecret: '', // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
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

    var user = {
        registrationId: registrationId,
        accessToken: accessToken,
        refreshToken: refreshToken
    };

    var axios = axiosFactory(user);

    axios.get('/security/login')
    .then(function(response) {
        user['profile'] = response.data;
        return cb(null, user);
    }).catch(function(error) {
        console.error(error);
        return cb(error);
    });
    
}

module.exports = passport;
