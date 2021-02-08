const app = require('./index')
const passport = require("passport")
const FbPassport = require("./OAuths/facebook")
const GooglePassport = require("./OAuths/google")

require('dotenv').config()

app.use(passport.initialize())
app.use(passport.session())



app.get('/' , (req,res)=>{
    res.render("index.ejs")
})

passport.serializeUser( (user, done) => {
    console.log('serialize: ', user)
    done(null, user);
});

passport.deserializeUser( (id, done) => {
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