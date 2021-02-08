const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GooglePassport = passport.use(new GoogleStrategy({
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

module.exports = GooglePassport