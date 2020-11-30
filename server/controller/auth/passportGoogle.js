const { User } = require('../../models');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const credentials = require('../../config/google.json');
const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../../config/config.js')[env];

module.exports = () => {
  passport.serializeUser((user, done) => {
    // console.log("serializeUser:", user)
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // console.log("deserializeUser:", user)
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: credentials.web.client_id,
    clientSecret: credentials.web.client_secret,
    callbackURL: credentials.web.redirect_uris[config.oauth_env] // localhost: [1], production: [0]
  },
  async (accessToken, refreshToken, profile, cb) => {
    // console.log('accessToken: ', accessToken);
    // console.log('refreshToken: ', refreshToken);
    // console.log('profile: ', profile);
    const email = profile.emails[0].value;
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
    // if new user
    else {
      const hash_password = await bcrypt.hash(process.env.SESSION_SECRET, 10);
      const newUser = await User.create({
        email: email,
        password: hash_password,
        name: name,
        oauth_provider: 'google',
        visit_count: 1,
        is_email_verified: true,
        is_policy_agreed: true
      });

      return cb(null, newUser);
    }
  }));
}