const { User } = require('../../models');
const jwt = require('jsonwebtoken');

/*
1. check query string from the received uri
  1. decode jwt token
    1. get email value from the token
      1. check user exists on db
        1. if user exists on db
          1. update email verification value into true
        2. else
          1. 403 err
*/

module.exports = {
  get: async (req, res) => {

    try {
      // decode token's value from the URI's query string.
      // expected prints: { email: value, iat:time , exp:time }
      const decodedToken = jwt.verify(req.query.token, process.env.secret);
  
      // check db has email(the decoded token) on the db
      const userData = await User.findOne({
        where: {
          email: decodedToken.email
        }
      });

      if (userData) {
        // update email verified column into true
        User.update({
          is_email_verified: true
        }, {  
          where: {
            email: decodedToken.email
          }
        });

        res.redirect(201, 'http://localhost:5533/user/signin');
      }
      else {
        res.status(403).send("The action code is invalid. This can happen if the code is malformed, expired, or has already been used.");
      }
    }
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 403).json({
        message: err.message || 'Your token may have problem. You can resend verification mail from sign in page. If you still have problem, please contact us: (contact information)'
      });  
    }

  }
};
