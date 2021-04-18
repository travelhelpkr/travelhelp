import { Request, Response } from 'express';

import { User } from '../../models';

/*
1. check req.session.user.id for checking user sign in status.
2. update user's last visited & language field on db reffering user's session
3. destroy user's session
*/

export const leaveService = async (req: Request, res: Response) => {

  try {
    const { language }: { language: string } = req.body;
    // check user has signed in. else case? do nothing.
    if (req.session.user_email) {
      // update last visited time & language setting of the user
      await User.update({
        last_visited_at: new Date(),
        language: language
      }, {  
        where: {
          email: req.session.user_email
        }
      });
      
      // end sesssion. redirection will be done from the client side
      await req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
        else {
          res.clearCookie('connect.sid');
          res.status(200).send({ message: 'successfully signed out' });
        }
      });
    }
    else if (req.session.passport.user.email) {
      // console.log('req.session.passport.user.email', req.session.passport.user.email);
      // update last visited time & language setting of the user
      await User.update({
        last_visited_at: new Date(),
        language: language
      }, {  
        where: {
          email: req.session.passport.user.email
        }
      });
      
      // end sesssion. redirection will be done from the client side
      await req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
        else {
          res.clearCookie('connect.sid');
          res.clearCookie('user');
          res.status(200).send({ message: 'successfully signed out' });
        }
      });
    }
    else {
      res.status(401).send({ message: 'sign out is only available when sigend in' });
    }
  }
  catch (err) {
    // response err to the client
    res.status(err.status || 500).json({
      message: err.message || 'Server does not response.',
      stack: err.stack
    });
  }

}
