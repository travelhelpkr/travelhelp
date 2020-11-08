const { User } = require('../../models');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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

module.exports = {
  getEmail: async (req, res) => {

    try {
      // decode token's value from the URI's query string.
      // expected prints: { email: value, iat:time , exp:time }
      const decodedToken = jwt.verify(req.query.token, process.env.secret);
  
      // check db has email(the decoded token) on the db
      const userData = await User.findOne({
        where: {
          email: decodedToken.email
        }
      });

      if (userData) {
        // update email verified column into true
        User.update({
          is_email_verified: true
        }, {  
          where: {
            email: decodedToken.email
          }
        });

        res.redirect(201, 'http://localhost:5533/user/signin');
      }
      else {
        res.status(403).send({
          message: 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.'
        });
      }
    }
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });
    }

  },

  postEmail: async (req, res) => {

    try {
      const { email } = req.body;
      
      // check db has email(the decoded token) on the db
      const newUser = await User.findOne({
        where: {
          email: email
        }
      });

      // redirect user into sigin page in case user email already verified or user access this page without email. such as directly approach with the url.
      if (newUser === null || newUser.dataValues.is_email_verified) {
        res.redirect(403, 'http://localhost:5533/user/signin');
      }
      else {
        // generate token for verifying user email. available for 24 hours.
        const generatedAuthToken = jwt.sign({ email: email }, process.env.secret, { expiresIn: 60 * 60 * 24 });
        
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
          
          http://localhost:3355/users/auth/email/?token=${generatedAuthToken}
  
          This link will only be valid for 24 hours. If it expires, you can resend it from the sign in page(http://localhost:5533/user/signin) by trying to sign in again with your email address.
          
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
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });
    }

  },

  getPassword: async (req, res) => {

    try {
      // decode token's value from the URI's query string.
      // expected prints: { email: value, iat:time , exp:time }
      const decodedToken = jwt.verify(req.query.token, process.env.secret);
      console.log('token: ', decodedToken);
      // check db has email(the decoded token) on the db
      const userData = await User.findOne({
        where: {
          email: decodedToken.email
        }
      });

      if (userData) {
        res.status(200).send({
          email: userData.dataValues.email,
          message: 'You can enter your new password now'
        });
      }
    } 
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });
    }
    
  },

  postPassword: async (req, res) => {

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
          to: userData.dataValues.email,
          subject: "Password changed",
          text: 
          `You have a new password!
          
          Your password for signing in to ${userData.dataValues.name} was recently changed. If you made this change, then we're all set.
  
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
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });  
    }

  }

};
