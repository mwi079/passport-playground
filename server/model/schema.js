const mongoose = require ('./model.index')
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema= new mongoose.Schema(
    {
        name: {type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        googleId:{type:String,required:false}
    },
    {autocreate:true}
);
userSchema.plugin(passportLocalMongoose);
const User=mongoose.model('users',userSchema);

module.exports=User;