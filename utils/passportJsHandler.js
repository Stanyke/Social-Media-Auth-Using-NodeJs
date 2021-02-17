const passport = require("passport")
const User = require("../model/User")
const textCaseHandler = require("./textCaseHandler")
const authTokenGenerator = require("./authTokenGenerator")

passport.serializeUser( (user, done) => {
    //console.log('serialize: ', user)
    done(null, user);
});

passport.deserializeUser( (id, done) => {
    //console.log('deserialize :', user)
    done(null, user);
});

exports.OAuthRegister = async (userData) => {
    const firstname = textCaseHandler.firstLetterUpperCase(userData.firstname)
    const lastname = textCaseHandler.firstLetterUpperCase(userData.lastname)
    const email = userData.email.toLowerCase()

    let currentUser = await User.findOne({email})
    if(currentUser){
        return {"data": {"success": false, "message": "Email is already registered with us."}, "statusCode": 409}
    }
    else{
        let saveUserToDb = await new User({
            firstname, lastname, email, "oauth.provider": userData.source, "oauth.oauthID": userData.id
        }).save()

        if(saveUserToDb){
            return {"data":{ "success": true, "message": `Account successfully registered.`, "userData": saveUserToDb }, "statusCode": 201 }
        }
        else{
            return {"data": {"success": false, "message": "We encountered an issue registering your account, try again."}, "statusCode": 500}
        }
    }
}

exports.OAuthLogin = async (userData) => {
    const email = userData.email.toLowerCase();
    let currentUser = await User.findOne({email})

    if(currentUser){
        return authTokenGenerator.generateToken({email})
    }
    else{
        return {"data": {"success": false, "message": "Login was unsuccessful, account is not registered with us."}, "statusCode": 409}
    }
}