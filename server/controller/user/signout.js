const { User } = require('../../models');

/*
1. check req.session.user.id for checking user sign in status.
2. update user's last visited & language field on db reffering user's session
3. destroy user's session
*/

module.exports = {
  post: async (req, res) => {
  
    const { language } = req.body;
    
    console.log('sign in status1: ', req.session.user_name);
    
    // check user has signed in. else case? do nothing.
    if (req.session.user_email) {

      console.log('sign in status2: ', req.session.user_name);

      // update last visited time & language setting of the user
      User.update({
        last_visited_at: new Date(),
        language: language
      }, {  
        where: {
          email: req.session.user_email
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
    else {
      console.log('sign out is only available when sigend in');
    }

  }
};
