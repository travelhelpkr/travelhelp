const { User } = require('../../models');
const bcrypt = require('bcrypt');

/*
1. check req.body.email exists on db
  1. if exist
    1. res 409 err
  2. if no matches
    1. res 200 ok
    2. put req.body datas on db
      1. encrypt password before putting it on db
*/

module.exports = {
  post: async (req, res) => {

    const { email, password, name, contact, is_email_verified, is_policy_agreed, language } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    
    // check db has req.body.email
    const userData = await User.findOne({
      where: {
        email: email
      }
    })
  
    if (userData) {
      res.status(409).send("User already existed.");
    }
    else {
      User.create({
        email: email,
        password: hash_password,
        name: name,
        contact: contact,
        is_email_verified: is_email_verified,
        is_policy_agreed: is_policy_agreed,
        last_visited_at: new Date(),
        language: language
      })
      .then(data => res.status(201).send("completely signed up"));
    }
    
  }
};
