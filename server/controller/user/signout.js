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

        console.log('test');
        // update last visited time & language setting of the user
        const userRow = await User.update({
          last_visited_at: new Date(),
          language: language
        }, {  
          where: {
            email: req.session.user_email
          }
        });
        console.log('test1');
        
        // end sesssion. redirection will be done from the client side
        const deleteSession = await req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('test3333');
            res.clearCookie('connect.sid');
            console.log('test33344');
            res.status(200).send({ message: 'successfully signed out' });
            console.log('test4444');
          }
        });
        
        console.log('test2');
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
        console.log('test1');
        
        // end sesssion. redirection will be done from the client side
        const deleteSession = await req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('test3333');
            res.clearCookie('connect.sid');
            res.clearCookie('google');
            res.clearCookie('name');
            res.clearCookie('email');
            console.log('test33344');
            res.status(200).send({ message: 'successfully signed out' });
            console.log('test4444');
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
