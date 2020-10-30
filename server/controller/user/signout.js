const { User } = require('../../models');
const bcrypt = require('bcrypt');

/*
1. check req.session.user.id
2. update user's last visited & language field on db reffering user's session
3. destroy user's session
*/

module.exports = {
  post: async (req, res) => {
    
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

    await req.session.destroy((err) => {
      req.session;
      res.status(200).send("successfully signed out");
    });
    
  }
};
