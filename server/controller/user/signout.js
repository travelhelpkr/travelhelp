const { User } = require('../../models');
const bcrypt = require('bcrypt');

/*
1. check req.session.user.id for checking user sign in status.
2. update user's last visited & language field on db reffering user's session
3. destroy user's session
*/

module.exports = {
  post: async (req, res) => {
    
    // check user has signed in. else case? do nothing.
    if (req.session.user_id) {
      const { language } = req.body;
  
      console.log('User Language:', language);
      console.log('req.session.user_id: ', req.session.user_id);
      
      // update last visited time & language setting of the user
      await User.update({
        last_visited_at: new Date(),
        language: language
      }, {  
        where: {
          id: req.session.user_id
        }
      })
  
      // end sesssion. redirection will be done from the client side
      await req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
        else {
          res.status(200).send("successfully signed out");
        }
      });
    }
    
  }
};
