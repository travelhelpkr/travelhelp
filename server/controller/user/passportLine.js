const { User } = require('../../models');
const passport = require('passport');
const LineStrategy = require('passport-line-auth').Strategy;
const jwt = require('jsonwebtoken');
const credentials = require('../../config/line.json');


module.exports = () => {
  passport.serializeUser((user, cb) => {
    console.log("serializeUser:", user)
    cb(null, user);
  })

  passport.deserializeUser((obj, cb) => {
    console.log("deserializeUser:", user)
    cb(null, obj);
  })

  passport.use(new LineStrategy({
    channelID: credentials.web.channelID,
    channelSecret: credentials.web.channelSecret,
    callbackURL: credentials.web.callbackURL,
    scope: ['profile', 'openid', 'email'],
    botPrompt: 'normal'
  },
    async function(accessToken, refreshToken, params, profile, cb) {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile:', profile);
      console.log('params:', params.id_token);
      // should be applied after permission of Line Corp.
      // const { email } = jwt.decode(params.id_token);
      // profile.email = email;
      // console.log('email:', email);
      const email = 'lineTest@gmail.com';
      const name = profile.displayName;
      const userData = await User.findOne({ where: { email: email } });

      if(userData) {
        return cb(null, userData);
      }
      else {
        const newUser = await User.create({
          email: email,
          password: '1234',
          name: name,
          oauth_provider: 'line',
          is_email_verified: true,
          is_policy_agreed: true
        });
        return cb(null, newUser);
      }
    }
  ))
}