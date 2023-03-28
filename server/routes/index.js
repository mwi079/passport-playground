const express=require('express');
const connectEnsureLogin=require('connect-ensure-login');
const router=express.Router();
const passport=require('../passport')
const {logoutUser, authLocal, registerUser}=require('../controlers')

  router.get('/', ((_,res)=>{res.send('Hello world')}))

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

  router.post('/login', authLocal)

  router.post('/register',registerUser)



  

  



module.exports=router