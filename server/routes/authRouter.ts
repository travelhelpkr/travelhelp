import { Router, Request, Response } from 'express';
import passport from 'passport';

import { Auth } from '../controller/auth';

const passportLine = require('../controller/auth/passportLine');

const env: string = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config.js')[env];

export const authRouter = Router();

// local
authRouter.post('/email', Auth.resendEmail);
authRouter.get('/email', Auth.updateEmail);
authRouter.post('/resetPassword', Auth.sendEmail); // changed the method from 'put' to 'post', and the uri path also has been chaged for avoiding the collision.
authRouter.get('/password', Auth.verifyToken);
authRouter.post('/password', Auth.updatePassword);

// google
Auth.google();
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: `${config.client_url}/user/signin` })
, (req: Request, res: Response) => {
  // defined variables will be tossed to the cookie of the browser
  const { id, name, email, oauth_provider, language }: { id:number, name:string, email:string, oauth_provider:string, language:string } = req.session.passport.user;
  res.cookie('user', { id, name, email, oauth_provider, language });
  res.redirect(`${config.client_url}`);
} );  

// line
passportLine();
authRouter.get('/line', passport.authenticate('line'));
authRouter.get('/line/callback', passport.authenticate('line', { failureRedirect: `${config.client_url}/user/signin` })
, (req: Request, res: Response) => {
  // defined variables will be tossed to the cookie of the browser
  const { id, name, email, oauth_provider, language }: { id:number, name:string, email:string, oauth_provider:string, language:string } = req.session.passport.user;
  res.cookie('user', { id, name, email, oauth_provider, language });
  res.redirect(`${config.client_url}`);
} );
