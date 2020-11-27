const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

/*
1. if email not exists
  1. redirect to signup page
2. if email exists
  1. but if it is not verified yet
    1. redirect to email verification page
  2. if email is verified
    1. send verification code to the email address
*/

module.exports = {
  // send email with redirect URI for changing password
  sendEmail: async (req, res) => {

    try {
      const { email } = req.body;
      
      // bring the user information with req.body.email
      const userData = await User.findOne({
        where: {
          email: email
        }
      });
      
      if (!userData) {
        return res.send({
          status: 404,
          message: 'You need to sign up first'
        });
      }
      else if (userData.oauth_provider !== 'local') {
        return res.send({
          status: 409,
          oauth_provider: userData.oauth_provider,
          message: `You already signed up with the '${userData.oauth_provider}'. Please try again with the social sign in method`
        });
      }
      else if (!userData.is_email_verified) {
        return res.send({
          status: 401,
          message: 'You need to verify your email address. Please check your email or resend it from this link'
        });
      }
      else {
        // generate token for verifying user email. available for an hour.
        const generatedAuthToken = jwt.sign({ email: email }, process.env.SESSION_SECRET, { expiresIn: 60 * 60});
        console.log('token: ', generatedAuthToken);
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
          to: userData.email,
          subject: "Reset your password",
          text: `Almost done, ${userData.name}!
          
You told us you forgot your password. If you really did, click this link to choose a new one:        
          
https://travelhelp.kr/user/resetPassword/?token=${generatedAuthToken}
          
This link will only be valid for an hour.

If you didn’t mean to reset your password, then you can just ignore this email; your password will not change.`
        }
  
        smtpTransporter.sendMail(mailOptions, (error, info) => {
          if(error) {
            console.log('error message: ', error);
            res.send({ message: 'err' });
          }
          else {
            console.log('Email sent: ', info.response);
            console.log("Message sent: %s", info.messageId);
            res.status(201).send({ message: 'Please check your email for changing the password' });
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

  },
  verifyToken: async (req, res) => {

    try {
      // decode token's value from the URI's query string.
      // expected prints: { email: value, iat:time , exp:time }
      const decodedToken = jwt.verify(req.query.token, process.env.SESSION_SECRET);
      console.log('token: ', decodedToken);
      // check db has email(the decoded token) on the db
      const userData = await User.findOne({
        where: {
          email: decodedToken.email
        }
      });

      if (userData) {
        res.status(200).send({
          email: userData.email,
          message: 'You can enter your new password now'
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
    
  },

  updatePassword: async (req, res) => {

    try {
      const { email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
  
      // check db has email(the decoded token) on the db
      const userData = await User.findOne({
        where: {
          email: email
        }
      });

      if (userData) {
        // update password column into new password
        const updatePassword = await User.update({
          password: hash_password
        }, {  
          where: {
            email: email
          }
        });

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
          to: userData.email,
          subject: "Password changed",
          text: `You have a new password!
          
Your password for signing in to ${userData.name} was recently changed. If you made this change, then we're all set.
  
If you did not make this change, please reset your password to secure your account.
          
Either way, feel free to reach out with any questions you might have. We're here to help.
          
Best,
The team at TravelHelp`
        }
  
        const sendEmail = await smtpTransporter.sendMail(mailOptions, (error, info) => {
          if(error) {
            console.log('error message: ', error);
            res.send({ message: 'err' });
          }
          else {
            console.log('Email sent: ', info.response);
            console.log("Message sent: %s", info.messageId);
            res.status(201).send({ message: 'Password changed' });
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
};
