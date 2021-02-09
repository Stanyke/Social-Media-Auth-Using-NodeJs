const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../model/User")

const GooglePassport = passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/google/callback"
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
          return done(null, { "success": false, "message": "Email already registered with us." })
      }
      else{
          return done(null, { "success": false, "message": `Email: ${userData.email} was not found.` })
      }

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

module.exports = GooglePassport