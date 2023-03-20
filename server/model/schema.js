const mongoose = require ('./model.index')

const userSchema= new mongoose.Schema(
    {
        name: {type:String,required:true},
        email:{type:String,required:true},
        googleId:{type:String,required:false}
    },
    {autocreate:true}
);

const User=mongoose.model('users',userSchema);

module.exports=User;