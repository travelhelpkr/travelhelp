const { User } = require('../../models');
const { Op } = require('sequelize');

/*
1. check req.session.user.id for checking user sign in status.
2. update user's last visited & language field on db reffering user's session
3. destroy user's session
*/

module.exports = {
  post: async (req, res) => {
    
    try {
      const { language } = req.body;
      // check user has signed in. else case? do nothing.
      if (req.session.user_email) {
        // update last visited time & language setting of the user
        const userRow = await User.update({
          last_visited_at: new Date(),
          language: language
        }, {  
          where: {
            email: req.session.user_email
          }
        });
        
        // end sesssion. redirection will be done from the client side
        const deleteSession = await req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
          else {
            res.clearCookie('connect.sid');
            res.status(200).send({ message: 'successfully signed out' });
          }
        });
      }
      else if (req.session.passport.user.email) {
        console.log('req.session.passport.user.email', req.session.passport.user.email);
        // update last visited time & language setting of the user
        const userRow = await User.update({
          last_visited_at: new Date(),
          language: language
        }, {  
          where: {
            email: req.session.passport.user.email
          }
        });
        
        // end sesssion. redirection will be done from the client side
        const deleteSession = await req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
          else {
            res.clearCookie('connect.sid');
            res.clearCookie('google');
            res.clearCookie('line');
            res.clearCookie('name');
            res.clearCookie('email');
            res.status(200).send({ message: 'successfully signed out' });
          }
        });
      }
      else {
        console.log('sign out is only available when sigend in');
      }
    }
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 400).json({
        message: err.message || 'wrong approach'
      });  
    }

  }
};
