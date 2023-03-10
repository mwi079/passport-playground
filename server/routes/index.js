const express=require('express');
const router=express.Router();
const passport=require('../passport')

// google login
router.get(
    '/google',async(req,res)=>{
        res.header("Access-Control-Allow-Origin", "*");

        await passport.authenticate('google', {
            scope: ['profile'],
            successMessage:true,
            failureMessage: true,
        })
 
    }
  );
  
  // google redirect
  router.get(
    '/redirect/google',
    passport.authenticate('google', {
        successMessage:true,
        failureMessage: true,
    }) 
  );

  



module.exports=router