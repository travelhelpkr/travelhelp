const express = require('express');
const passport = require('passport');
const passportGoogle = require('../controller/user/passportGoogle.js');
const passportLine = require('../controller/user/passportLine.js');

const oAuthRouter = express.Router();

// google
passportGoogle();
oAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
oAuthRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5533/user/signin' }),
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
oAuthRouter.get('/line', passport.authenticate('line'));
oAuthRouter.get('/line/callback', passport.authenticate('line', { failureRedirect: 'http://localhost:5533/user/signin' }),
  async (req, res) => {
    console.log('req.session.passport:', req.session.passport.user);
    res.cookie('line', 'line');
    res.cookie('id', req.session.passport.user.id);
    res.cookie('name', req.session.passport.user.name);
    res.cookie('email', req.session.passport.user.email);
    res.redirect('http://localhost:5533');
  }
)

module.exports = oAuthRouter;
