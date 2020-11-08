const express = require('express');
const passport = require('passport');

const oAuthRouter = express.Router();

oAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
oAuthRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5533/user/signin' }),
  async (req, res) => {
    res.redirect('http://localhost:5533');
  }
);

module.exports = oAuthRouter;
