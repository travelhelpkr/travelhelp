const { User } = require('../../models');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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
  post: async (req, res) => {

    try {
      const { email } = req.body;
      
      // bring the user information with req.body.email
      const userData = await User.findOne({
        where: {
          email: email
        }
      });

      // check req.body.email exists on db
      if (!userData) {
        res.send({
          status: 404,
          message: 'You need to sign up first'
        });
      }
      else if (userData && !userData.dataValues.is_email_verified) {
        res.send({
          status: 401,
          message: 'You need to verify your email address. Please check your email or resend it from this link'
        });
      }
      else {
        // generate token for verifying user email. available for an hour.
        const generatedAuthToken = jwt.sign({ email: email }, process.env.secret, { expiresIn: 60 * 60});
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
          to: userData.dataValues.email,
          subject: "Reset your password",
          text: 
          `Almost done, ${userData.dataValues.name}!
          
          You told us you forgot your password. If you really did, click this link to choose a new one:        
          
          http://localhost:5533/user/resetPassword/?token=${generatedAuthToken}
          
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
      // response err to client. no need to throw err.
      res.status(err.status || 400).json({
        message: err.message || 'wrong approach'
      });
    }

  }
};
