const app = require('./index')
const queryString = require('query-string');
const axios = require('axios');
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config()

app.use(passport.initialize())
app.use(passport.session())



app.get('/' , (req,res)=>{
    res.render("index.ejs")
})


passport.use(new FacebookStrategy({
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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
        const details= {
            authId:profile._json.sub,
            firstname:profile._json.family_name,
            lastname:profile._json.given_name,
            profilepix:profile._json.picture,
            email:profile._json.email
        }

        console.log(profile)
        return done(null,profile)
        /*model.findOne({email:details.email}, async function(err , found){
            if(found){
                let result = await  tokenGen.generateToken(found)
                const data = {token:result , data:found , message:'authentication was successfull'}
                
                return done(err , data);
            }
            else{
                model.create(details, async function (err, user) {
                    let findUser = await model.findOne({email:details.email})
                    let result = await  tokenGen.generateToken(findUser)
                    const data = {token:result , data:findUser , message:'authentication was successfull'}         
                    return done(err, data);
                });
            }
        })*/
    }
));

passport.serializeUser(function (user, done) {
    console.log('serialize: ', user)
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize :', user)
    done(null, user);
});

app.get("/failed", (req,res)=> res.send("you have failed to login"));
app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback', passport.authenticate('google', {
    successRedirect : '/profile',
    failureRedirect : '/failed'
    }), (req, res) => {
        const userDetails =  req.user
        res.status(200).send(userDetails)
    }
);



app.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/failed'
    }), (req, res) => {
        const userDetails =  req.user
        res.status(200).send(userDetails)
    }
);



app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }))

app.get('/profile',(req,res) => {
    res.render("profile.ejs")
})


module.exports = app;