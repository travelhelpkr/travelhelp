const express = require('express');
const passport = require('passport');
const verifyEmail = require('../controller/auth/verifyEmail');
const resetPassword = require('../controller/auth/resetPassword');
const passportGoogle = require('../controller/auth/passportGoogle.js');
const passportLine = require('../controller/auth/passportLine.js');

const authRouter = express.Router();

// local
authRouter.post('/email', verifyEmail.resendEmail);
authRouter.get('/email', verifyEmail.updateEmail);
authRouter.post('/resetPassword', resetPassword.sendEmail);
authRouter.get('/password', resetPassword.verifyToken);
authRouter.post('/password', resetPassword.updatePassword);

// google
passportGoogle();
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: 'https://travelhelp.kr/user/signin' })
, (req, res) => {
  // defined variables will be tossed to the cookie of the browser
  const { id, name, email, oauth_provider, language } = req.session.passport.user;
  res.cookie('user', { id, name, email, oauth_provider, language });
  res.redirect('https://travelhelp.kr/');
}
);  

// line
passportLine();
authRouter.get('/line', passport.authenticate('line'));
authRouter.get('/line/callback', passport.authenticate('line', { failureRedirect: 'https://travelhelp.kr/user/signin' })
, (req, res) => {
  // defined variables will be tossed to the cookie of the browser
    const { id, name, email, oauth_provider, language } = req.session.passport.user;
    res.cookie('user', { id, name, email, oauth_provider, language });
    res.redirect('https://travelhelp.kr/');
  }
)

module.exports = authRouter;
