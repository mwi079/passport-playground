const isAuthenticated = async (req,res,next) => {
    try {
      if (req.body.allow) next();
      else return res.sendStatus(401);
    } catch (error) {
      next(error);
    }
  };

  module.exports=isAuthenticated