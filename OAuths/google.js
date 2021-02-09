const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../model/User")

const GooglePassport = passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
      const userData= {
          "id": profile._json.sub,
          "firstname": profile._json.family_name,
          "lastname": profile._json.given_name,
          "profile": profile._json.picture,
          "email": profile._json.email,
          "email_verified": profile._json.email_verified,
          "token": accessToken
      }

        console.log(userData)
        //return done(null,profile)

        let getUser = await User.findOne({email: userData.email}).exec()
        if(getUser){
            return done(null, { "success": true, "message": "Email already registered with us.", "user": userData })
        }
        else{
            return done(null, { "success": false, "message": `Email: ${userData.email} was not found.`, "user": userData  })
        }
    }
));

module.exports = GooglePassport