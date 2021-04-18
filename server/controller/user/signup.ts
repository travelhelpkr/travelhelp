import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import { User } from '../../models';

const env: string = process.env.NODE_ENV || 'production';
const config: any = require(__dirname + '/../../config/config.js')[env];

export const askSignup = async (req: Request, res: Response) => {

  try {
    const { email, password, name, is_policy_agreed, language }: { email: string, password: string, name: string, is_policy_agreed: boolean, language: string  } = req.body;
    
    // check db has req.body.email
    const userData: JSON = await User.findOne({
      where: {
        email: email
      }
    });
  
    if (userData) {
      res.send({
        status: 409,
        message: 'User already existed.'
      });
    }
    else {
      const hash_password: string = await bcrypt.hash(password, 10);
      // generate token for verifying user email. available for 24 hours.
      const generatedAuthToken: string = jwt.sign({ email: email }, config.sessionSecret, { expiresIn: 60 * 60 * 24 });
      // make a new user on the db
      const newUser = await User.create({
        email: email,
        password: hash_password,
        name: name,
        is_policy_agreed: is_policy_agreed,
        last_visited_at: new Date(),
        language: language
      })
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

      const mailOptions: { from: string, to: string, subject: string, text: string } = {
        from: `"TravelHelp" <${process.env.NODEMAILER_USER}>`,
        to: newUser.email,
        subject: "Verify your TravelHelp account",
        text: `Almost done, ${newUser.name}!
        
To activate your TravelHelp account, we just need yo verify your email address:        
        
${config.client_url}/user/verifyEmail/?token=${generatedAuthToken}

This link will only be valid for 24 hours. If it expires, you can resend it from the sign in page(${config.client_url}/user/signin) by trying to sign in again with your email address.
        
If you have any problems, please contact us: (attatch channel.io link)`
      }

      smtpTransporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          console.log('error message: ', error);
          res.send({message: 'err'});
        }
        else {
          console.log('Email sent: ', info.response);
          console.log("Message sent: %s", info.messageId);
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
    // res.status(err.status || 403).json({
    //   message: err.message || 'Your token may have problem. You can resend verification mail from sign in page. If you still have problem, please contact us: (contact information)'
    // });
  }
  
}
