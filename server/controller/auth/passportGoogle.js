const { User } = require('../../models');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const credentials = require('../../config/google.json');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser:", user)
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("deserializeUser:", user)
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: credentials.web.client_id,
    clientSecret: credentials.web.client_secret,
    // localhost: [1], production: [0]
    callbackURL: credentials.web.redirect_uris[1]
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const userData = await User.findOne({ where: { email: email } });

    // if existing user
    if (userData) {
      // store user information & sign in status & visit times on the session
      // req.session.user_name = userData.dataValues.name;
      // req.session.user_email = userData.dataValues.email;
      // req.session.user_language = userData.dataValues.language;
      // req.session.visit_count = userData.dataValues.visit_count;

      // if (req.session.visit_count) {
      //   req.session.visit_count++;
      // } else {
      //   req.session.visit_count = 1;
      // }

      // to do
      // count up
      // session update: lang, ----
      
      return cb(null, userData);
    }
    // if new user
    else {
      const hash_password = await bcrypt.hash(process.env.secret, 10);
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