const mongoose = require ('./model.index')

const userSchema= new mongoose.Schema(
    {
        name: {type:String,required:true},
        email:{type:Number,required:true}
    },
    {autocreate:true}
);

const User=mongoose.model('users',userSchema);

module.exports=User;