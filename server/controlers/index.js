function logoutUser (req, res, next) {
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

  module.exports=logoutUser

