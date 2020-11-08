const { User } = require('../../models');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const credentials = require('../../config/google.json');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
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
    const name = profile.name.givenName;
    const userData = await User.findOne({ where: { email: email } });

    // if existing user
    if (userData) {
      // store user information & sign in status & visit times on the session
      req.session.user_name = userData.dataValues.name;
      req.session.user_email = userData.dataValues.email;
      req.session.user_language = userData.dataValues.language;
      req.session.visit_count = userData.dataValues.visit_count;

      if (req.session.visit_count) {
        req.session.visit_count++;
      } else {
        req.session.visit_count = 1;
      }
      
      return cb(null, userData);
    }
    // if new user
    else {
      const newUser = await User.create({
        email: email,
        is_email_verified: true,
        is_policy_agreed: true,
        name: name
      });

      return cb(null, newUser);
    }
  }));
}