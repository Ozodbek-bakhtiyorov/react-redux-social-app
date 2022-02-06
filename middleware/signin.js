const jwt = require('jsonwebtoken');
const {User} = require('../models');
const {JWT_KEY} = require('../config/keys')
module.exports = (req, res, next)=>{
  const {authorization} = req.headers;
  if(!authorization){
    res.status(401).json({error:"You Must Be Logged in "})
  }
  const token = authorization.replace("Ozodbek ", "");
  jwt.verify(token, JWT_KEY, (err,payload)=>{
    if(err) {
      return res.status(401).json({error:"you must be logged in"});
    }

    const {_id} = payload;
    User.findOne({_id})
      .then(userData=>{
        req.user = userData;
        next();
      })
  })
}