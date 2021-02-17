const app = require('./index')
const passport = require("passport")

const facebookPassportAuth = require("./oauths/facebook")
const googlePassportAuth = require("./oauths/google")

app.use(passport.initialize())
app.use(passport.session())

app.get('/' , (req,res)=>{
    res.render("index.ejs")
})

app.get('/users/auth/google/register', passport.authenticate('google', { scope: ['profile','email'], state: "register" }));

app.get('/users/auth/google/login', passport.authenticate('google', { scope: ['profile','email'], state: "login" }));

app.get('/users/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    const messageGotten = await req.user
    res.status(messageGotten.statusCode).json(messageGotten.data)
});

app.get('/users/auth/facebook/register', passport.authenticate('facebook', { scope : 'email,user_photos', state: 'register' }))

app.get('/users/auth/facebook/login', passport.authenticate('facebook', { scope : 'email,user_photos', state: 'login' }))

app.get('/users/auth/facebook/callback', passport.authenticate('facebook'), async (req, res) => {
    const messageGotten = await req.user
    res.status(messageGotten.statusCode).json(messageGotten.data)
});


module.exports = app;