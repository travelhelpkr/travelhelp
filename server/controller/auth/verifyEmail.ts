import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import { User } from '../../models';

const env: string = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../../config/config.js')[env];

/*
1. check query string from the received uri
  1. decode jwt token
    1. get email value from the token
      1. check user exists on db
        1. if user exists on db
          1. update email verification value into true
        2. else
          1. 403 err
*/

// send email to the user if the user's email is not verified.
export const resendEmail = async (req: Request, res: Response) => {

  try {
    const { email }: { email: string } = req.body;
    
    // check db has email(the decoded token) on the db
    const newUser = await User.findOne({
      where: {
        email: email
      }
    });
    
    // redirect user into sigin page in case user email already verified or user access this page without email. such as directly approach with the url.
    if (newUser === null || newUser.dataValues.is_email_verified) {
      res.redirect(403, `${config.client_url}/user/signin`);
    }
    else {
      // generate token for verifying user email. available for 24 hours.
      const generatedAuthToken: string = jwt.sign({ email: email }, process.env.SESSION_SECRET as string, { expiresIn: 60 * 60 * 24 });
      
      const smtpTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        // if port is 587 or 25, secure should be false. Or if port is 465, secure should be true.
        port: 587,
        secure: false,
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        },
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS
        }
      });
      
      const mailOptions = {
        from: `"TravelHelp" <${process.env.NODEMAILER_USER}>`,
        to: newUser.dataValues.email,
        subject: "Verify your TravelHelp account",
        text: `Almost done, ${newUser.dataValues.name}!
        
To activate your TravelHelp account, we just need yo verify your email address:        
        
${config.client_url}/user/verifyEmail/?token=${generatedAuthToken}
        
This link will only be valid for 24 hours. If it expires, you can resend it from the sign in page(${config.client_url}/user/signin) by trying to sign in again with your email address.
        
If you have any problems, please contact us: (attatch channel.io link)`
      }
      
      smtpTransporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          // console.log('error message: ', error);
          res.send({message: 'err'});
        }
        else {
          // console.log('Email sent: ', info.response);
          // console.log("Message sent: %s", info.messageId);
          res.status(201).send({ message: 'Please verify your email address' });
        }
        smtpTransporter.close();
      });
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

// verify user's token when user click the given link from the verification email
// and update user email verification status into verified if it is vaid
export const updateEmail = async (req: Request, res: Response) => {

  try {
    // decode token's value from the URI's query string.
    // expected prints: { email: value, iat:time , exp:time }
    const decodedToken: any = jwt.verify(req.query.token as string, process.env.SESSION_SECRET as string);
    // console.log('token: ', decodedToken);
    
    // check db has email(the decoded token) on the db
    await User.update({
      is_email_verified: true
    }, {  
      where: {
        email: decodedToken.email
      }
    });

    res.status(200).send({
      message: 'Your email address has verified.'
    });
  }
  catch (err) {
    // response err to the client
    res.status(err.status || 500).json({
      message: err.message || 'Server does not response.',
      stack: err.stack
    });
  }

}
