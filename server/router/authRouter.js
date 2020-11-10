const express = require('express');
const passport = require('passport');
const auth = require('../controller/auth/auth');
const reset_password = require('../controller/auth/reset_password');
const passportGoogle = require('../controller/auth/passportGoogle.js');
const passportLine = require('../controller/auth/passportLine.js');

const authRouter = express.Router();

// local
authRouter.get('/email', auth.getEmail);
authRouter.post('/email', auth.postEmail);
authRouter.post('/reset_password', reset_password.post);
authRouter.get('/password', auth.getPassword);
authRouter.post('/password', auth.postPassword);

// google
passportGoogle();
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5533/user/signin' }),
async (req, res) => {
  console.log('req.session.passport:', req.session.passport.user);
  res.cookie('google', 'google');
  res.cookie('id', req.session.passport.user.id);
  res.cookie('name', req.session.passport.user.name);
  res.cookie('email', req.session.passport.user.email);
  res.redirect('http://localhost:5533');
}
);

// line
passportLine();
authRouter.get('/line', passport.authenticate('line'));
authRouter.get('/line/callback', passport.authenticate('line', { failureRedirect: 'http://localhost:5533/user/signin' }),
  async (req, res) => {
    console.log('req.session.passport:', req.session.passport.user);
    res.cookie('line', 'line');
    res.cookie('id', req.session.passport.user.id);
    res.cookie('name', req.session.passport.user.name);
    res.cookie('email', req.session.passport.user.email);
    res.redirect('http://localhost:5533');
  }
)

module.exports = authRouter;
