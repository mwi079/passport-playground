const express=require('express');
const router=express.Router();
const passport=require('../passport')
const {logoutUser, registerUser, ensureAuthenticated}=require('../controlers')

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
      res.redirect(`http://localhost:3000/dashboard/${req.user._doc.name}`);
    } 
  );
  router.get('/logout',logoutUser);

  router.post('/login', (req, res,next) => {
    passport.authenticate('local',function(err,user,info){
      if(err){
        res.status(500)
      }
      else{
        res.send(user)
      }
    })(req, res,next)}
  )

  router.post('/register',registerUser)

  router.get('/checkData',(req,res)=>res.send(req.user))

  router.get('/checkAuth',ensureAuthenticated)



  

  



module.exports=router