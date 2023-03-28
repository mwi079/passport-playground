const mongoose = require ('./model.index')
const bcrypt=require('bcrypt');

const userSchema= new mongoose.Schema(
    {
        name: {type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        googleId:{type:String,required:false}
    },
    {autocreate:true}
);

userSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null)
}

userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

const User=mongoose.model('users',userSchema);

module.exports=User;