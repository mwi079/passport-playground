//const passport=require('../passport')
const User= require('../model/schema')

function logoutUser (req, res) { //! Create standard "next"
    try {
      req.session.destroy(() => {
        return;
      });
      res.redirect(`http://localhost:3000`)
      res.sendStatus(200);
    } catch (error) {
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

  module.exports={logoutUser, registerUser}

