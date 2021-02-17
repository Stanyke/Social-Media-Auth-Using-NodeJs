const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.generateToken = async (data) => {
  
  const authToken = await jwt.sign({ data }, secret, { expiresIn: "24hrs" })
  
  if(authToken){
    return {"data": {"success": true, "message": authToken}, "statusCode": 200}
  }
  else{
    return {"data": {"success": false, "message": `There was an issue while signing you in, please try again.`}, "statusCode": 422}
  }
}