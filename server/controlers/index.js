//const passport=require('../passport')
const User= require('../model/schema')

function logoutUser (req, res) { //! Create standard "next"
    try {
      console.log('logging out')
      req.logout(function(err){
        if(err)res.send(err)
        res.redirect('http://localhost:3000/')
      })
    } catch (error) {
      console.log('error',error)
      res.status(500)
      res.send(error)
    }
  };

  // function authLocal (req,res){
  //   console.log('auth local')
    
  // } 

  async function registerUser (req,res){
    try{
      const password=User.generateHash(req.body.password)
      const user={...req.body,password}
      const newUser=await User.create(user)
      res.send(newUser)

    } catch (error){
      console.log(error)
      res.status(500)
      res.send(error)
    }
  }

  function ensureAuthenticated(req, res) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) { return res.send('You are authenticated')  }
    res.status(500);
  }

  module.exports={logoutUser, registerUser,ensureAuthenticated}

