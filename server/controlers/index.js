//const passport=require('../passport')
const User= require('../model/schema')

function logoutUser (req, res) { //! Create standard "next"
    try {
      console.log('logging out', req.user)
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

  function checkAuthenticated(req, res,next) {
    console.log('i am checking if i am authenticated')
    console.log('req.passport',req.passport)
    console.log('req.user',req.user)
    if (req.isAuthenticated()) { 
      console.log('i am authenticated')
      return next()  
    }
    
    else {
      console.log('i am not authenticated');
      return res.redirect('/')
    }
  }

  module.exports={logoutUser, registerUser,checkAuthenticated}

