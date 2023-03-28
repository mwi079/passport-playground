const passport=require('../passport')
const User= require('../model/schema')

function logoutUser (req, res, next) { //! Be consistant with next
    try {
      req.session.destroy(() => {
        return;
      });
      res.redirect(`http://localhost:3000`)
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  function authLocal (req,res,next){
    passport.authenticate('local',
    (err,user,info)=>{
      console.log('error',err)
      if(err){
        return next(err);
      }
      if(!user){
        console.log('!user')
        return res.redirect('/login?info='+info);
      }
      req.logIn(user,function(err){
        console.log('user',user)
        if(err){
          return next(err);
        }
        return res.redirect('/');
      })
    })
  } 

  async function registerUser (req,res,next){
    try{
      const password=User.generateHash(req.body.password)
      const user={...req.body,password}
      console.log(user)
      const newUser=await User.create(user)
      res.send(newUser)
    } catch (error){
      res.status(500)
      res.send(error._message)
    }
  }

  module.exports={logoutUser, authLocal, registerUser}

