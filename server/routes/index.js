const express=require('express');
const router=express.Router();
const passport=require('../passport')
const {logoutUser, registerUser, checkAuthenticated}=require('../controlers')

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

  router.get('/login',checkAuthenticated,(req,res)=>{
    console.log('req.passport',req.passport)
    res.send('TESTING')
  })
  router.post('/login', (req, res,next) => {
    passport.authenticate('local',function(err,user,info){
      console.log(err,user)
      if(err){
        res.status(500)
      }
      else{
        req.login(user,function(err){
          if(err){
            console.log('logging in',err)
            res.status(500)
          }
          else {
            console.log('user',req.user)
            res.redirect('/login')
          }
        })
        
      }
    })(req, res,next)}
  )

  router.post('/register',registerUser)

  router.get('/checkData',checkAuthenticated,(req,res)=>res.send(req.user))

 



  

  



module.exports=router