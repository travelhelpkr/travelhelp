const { User } = require('../../models');
const bcrypt = require('bcrypt');

/*
1. check req.email & password from the db
  1. if no email matches
    1. res err, 401 sign up first
  2. if email exists on db
    1. but the password does not match from the db
      1. res err, 401 wrong password
    2. & password matches
      1. update last visitsed time
      2. store sign in information(user ID) on session
      3. Succeed sign in! res 200
        1. redirect to Home page(handle from client side)
*/

module.exports = {
  post: async (req, res) => {

    const { email, password } = req.body;
    
    // bring the user information with req.body.email
    const userData = await User.findOne({
      where: {
        email: email
      }
    });
    
    // check req.body.email exists on db
    if (!userData) {
      res.status(401).send("You need to sign up first.");
    }
    else {
      // compare req.body.password && hashed password from db
      bcrypt.compare(password, userData.dataValues.password, (err, result) => {
        // catch err or wrong password, 
        if (err || !result) { 
          console.log('Error from password: ', err);
          res.status(401).send("Wrong password.");
        }
        else {
          // update last visited time of the user
          User.update({
            last_visited_at: new Date()
          }, {  
            where: {
              id: userData.dataValues.id
            }
          })

          // store user information & sign in status & visit times on the session
          req.session.user_name = userData.dataValues.name;
          req.session.user_email = userData.dataValues.email;
          req.session.is_signedIn = true;
          req.session.visit_count = userData.dataValues.visit_count + 1;
          if (userData.dataValues.visit_count) {
            userData.dataValues.visit_count++;
            req.session.visit_count = userData.dataValues.visit_count;
            console.log(`${req.session.user_name} visited Travel Help ${userData.dataValues.visit_count} times`)
          } else {
            User.update({
              visit_count: 1
            }, {  
              where: {
                id: userData.dataValues.id
              }
            })
            .then(data => {
              console.log('data: ', data);
              req.session.visit_count = data.dataValues.visit_count;
              console.log('Welcome to the Travel Help!')
            })
          }

          req.session.save(() => {
            console.log('current session ID: ', req.session.id);
            // send user info to client side as an object
            // res.send({name: req.session.user_name, email: req.session.user_email});
            res.status(200).send({name: userData.dataValues.name, email: userData.dataValues.email});
          });
        }
      });
    }
    
  }
};
