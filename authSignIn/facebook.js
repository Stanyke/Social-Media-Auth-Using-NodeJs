const model = require('../model/User');
var passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy

require('dotenv').config()

passport.serializeUser(function (user, done) {
    console.log('serialize: ', user)
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize :', user)
    done(null, user);
});

passport.use(new facebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5000/facebook/callback",
    profileFields: ['id', 'displayName', 'profileUrl', 'name', 'gender', 'picture.type(large)', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        const details = {
            authId: profile._json.id,
            firstname: profile._json.first_name,
            lastname: profile._json.last_name,
            profilepix: profile._json.picture.data.url,
            email: profile._json.email
        }

        console.log(profile)
        return profile

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
