const {Schema,model} = require('mongoose');
const {ObjectId} = Schema.Types;

const PostSchema = new Schema({
  title:{
    type:String, 
    required:true
  }, 
  body:{
    type:String, 
    required:true
  },
  photo:{
    type:String, 
    required:true
  }, 
  likes: [
    {
      type:ObjectId, 
      ref:"User"
    }
  ], 
  comments:[
    {
      text:String,
      commitedBy:{
        type:ObjectId, 
        ref:"User"
      }
    }
  ],
  postedBy:{
    type:ObjectId, 
    ref:"User"
  },
 
});

module.exports = model('Post',PostSchema);
