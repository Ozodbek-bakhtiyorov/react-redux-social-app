const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
  name:{
    type:String,
    required:true,
  }, 
  email:{
    type:String,
    required:true, 
    unique:true
  },
  password:{
    type:String, 
    required:true
  },
  avatar:{
    type:String,
    default:"https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg"
  },
  followers:[
    {
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  ], 
  following:[
    {
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  ]
})


module.exports = model('User', UserSchema);