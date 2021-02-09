const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
const User = require("../model/User")

require('dotenv').config()

const FbPassport = passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email']
}, async (accessToken, refreshToken, profile, done) => {

    const userData = {
        "id": profile.id,
        "firstname": profile._json.first_name,
        "lastname": profile._json.last_name,
        "birthday": profile._json.birthday,
        "email": profile._json.email,
        "photo": profile.photos[0].value,
        "gender": profile.gender,
        "token": accessToken
    };

    //console.log(userData)

    
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

module.exports = FbPassport;