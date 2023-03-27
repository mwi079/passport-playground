const express=require('express');
const connectEnsureLogin=require('connect-ensure-login');
const router=express.Router();
const passport=require('../passport')
const logoutUser=require('../controlers')

  router.get('/', ((req,res)=>{res.send('Hello world')}))
// // google login
  router.get(
    '/auth/google',
    passport.authenticate('google', 
    {
      scope: ['profile','email'],
      successMessage:true,
      failureMessage: true,
    })

 
);
//   // google redirect
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', 
    { 
      failureRedirect:'http://localhost:3000/woops'
    }),
    function(req,res){
      console.log('Redirect function')
      console.log(req.user._doc)
      res.redirect(`http://localhost:3000/dashboard/${req.user._doc.googleId}`);
    } 
  );
  router.get('/logout',connectEnsureLogin.ensureLoggedIn() ,logoutUser);

  router.post('/login',(req,res,next)=>{
    console.log('post',req.body)
    passport.authenticate('local',
    (err,user,info)=>{
      if(err){
        return next(err);
      }
      if(!user){
        return res.redirect('/login?info='+info);
      }
      req.logIn(user,function(err){
        if(err){
          return next(err);
        }
        return res.redirect('/');
      })
    })(req,res,next);
  })

  

  



module.exports=router