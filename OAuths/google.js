const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportJsHandler = require("../utils/passportJsHandler")

const googlePassportAuth = passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_BASE_URL}/users/auth/google/callback`,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try{
        const userData= {
            "id": profile._json.sub,
            "firstname": profile._json.family_name,
            "lastname": profile._json.given_name,
            "profile": profile._json.picture,
            "email": profile._json.email,
            "email_verified": profile._json.email_verified,
            "token": accessToken,
            "source": "google"
        }

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
        return done(null, {"data": {"success": false, "message": "Registration failed, try again."}, "statusCode": 500})
    }
}
));

module.exports = googlePassportAuth