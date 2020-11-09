const express = require('express');
const passport = require('passport');

const oAuthRouter = express.Router();

oAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
oAuthRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5533/user/signin' }),
  async (req, res) => {
    console.log('req.session:', req.session.passport.user);
    res.cookie('google', 'google');
    res.cookie('name', req.session.passport.user.name);
    res.cookie('email', req.session.passport.user.email);
    res.redirect('http://localhost:5533');
  }
);

module.exports = oAuthRouter;
