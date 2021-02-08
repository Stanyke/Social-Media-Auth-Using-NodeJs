const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy

require('dotenv').config()

const FbPassport = passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5000/facebook/callback",
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email']
}, (accessToken, refreshToken, profile, done) => {
    var user = {
            facebookId: profile.id,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            birthday: profile._json.birthday
    };

    const messageToUser = {
        "message": {
            "accesToken": accessToken,
            "refreshToken": refreshToken,
            "profile": profile
        }
    }

    //console.log(messageToUser)
    console.log(profile)
    return done(null,profile)
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