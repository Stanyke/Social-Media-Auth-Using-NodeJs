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
        return done(null, { "success": false, "message": "Email already registered with us.", "user": userData })
    }
    else{
        return done(null, { "success": false, "message": `Email: ${userData.email} was not found.`, "user": userData  })
    }

    //return messageToUser
    //the same User variable from above
    // User.findOneOrCreate({facebookId: profile.id}, user, function (err, user) {
    //      return done(err, user, {type: 'facebook'});
    // });

    /*model.findOne({ email: details.email }, async function (err, found) {
        if (found) {
            let result = await tokenGen.generateToken(found)
            const data = { token: result, data: found, message: 'authentication was successfull' }
            return done(err, data);
        } else {
            model.create(details, async function (err, user) {
                let findUser = await model.findOne({ email: details.email })
                let result = await tokenGen.generateToken(findUser)
                const data = { token: result, data: findUser, message: 'authentication was successfull' }
                return done(err, data);
            });
        }
    })*/
}
));

module.exports = FbPassport;