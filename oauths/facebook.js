const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
const passportJsHandler = require("../utils/passportJsHandler")

const facebookPassportAuth = passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: `${process.env.API_BASE_URL}/users/auth/facebook/callback`,
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email'],
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try{
        const userData = {
            "id": profile.id,
            "firstname": profile._json.first_name,
            "lastname": profile._json.last_name,
            "birthday": profile._json.birthday,
            "email": profile._json.email,
            "photo": profile.photos[0].value,
            "gender": profile.gender,
            "token": accessToken,
            "source": "facebook"
        };

        if(req.query.state === "login"){
            let oauthLoginProcess = await passportJsHandler.OAuthLogin(userData)
            done(null, oauthLoginProcess)
        }
        else if(req.query.state === "register"){
            let oauthRegisterProcess = await passportJsHandler.OAuthRegister(userData)
            done(null, oauthRegisterProcess)
        }
        
    }
    catch(e){
        return done(null, {"data": {"success": false, "message": "Facebook Auth failed, try again."}, "statusCode": 500})
    }
}
));

module.exports = facebookPassportAuth;