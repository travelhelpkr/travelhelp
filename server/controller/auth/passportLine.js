const { User } = require('../../models');
const passport = require('passport');
const LineStrategy = require('passport-line-auth').Strategy;
const credentials = require('../../config/line.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../../config/config.js')[env];


module.exports = () => {
  passport.serializeUser((user, cb) => {
    // console.log("serializeUser:", user)
    cb(null, user);
  })

  passport.deserializeUser((obj, cb) => {
    // console.log("deserializeUser:", user)
    cb(null, obj);
  })

  passport.use(new LineStrategy({
    channelID: credentials.web.channelID,
    channelSecret: credentials.web.channelSecret,
    callbackURL: credentials.web.callbackURL[config.oauth_env], // localhost: [1], production: [0]
    scope: ['profile', 'openid', 'email'],
    botPrompt: 'normal'
  },
    async (accessToken, refreshToken, params, profile, cb) => {
      // console.log('accessToken: ', accessToken);
      // console.log('refreshToken: ', refreshToken);
      // console.log('profile:', profile);
      // console.log('params:', params.id_token);
      // should be applied after permission of Line Corp.
      const { email } = jwt.decode(params.id_token);
      // profile.email = email;
      const name = profile.displayName;
      const userData = await User.findOne({ where: { email: email } });

      // if user email already been occuipied by local signup method
      if (userData && userData.dataValues.oauth_provider === 'local') {
        return cb(null, false, { message: `User email(${email}) already existing on Travel Help. Please sigin in with this email`});
        // {
        //   status: 409,
        //   message: `User email(${email}) already existing on Travel Help. Please sigin in with this email`
        // }
      }
      // if existing user
      else if (userData) {
        userData.increment('visit_count');
        return cb(null, userData);
      }
      else {
        const hash_password = await bcrypt.hash(process.env.SESSION_SECRET, 10);
        const newUser = await User.create({
          email: email,
          password: hash_password,
          name: name,
          oauth_provider: 'line',
          visit_count: 1,
          is_email_verified: true,
          is_policy_agreed: true
        });
        return cb(null, newUser);
      }
    }
  ))
}