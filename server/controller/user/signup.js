const { User } = require('../../models');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

/*
1. check req.body.email exists on db
  1. if exist
    1. res 409 err
  2. if no matches
    1. put req.body datas on db
      1. encrypt password before putting it on db
      2. res 201 ok
    2. send verification email to the user_email
*/

module.exports = {
  post: async (req, res) => {

    try {
      const { email, password, name, is_policy_agreed, language } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const generatedAuthToken = jwt.sign({ email: email }, process.env.secret, { expiresIn: 60 * 60 * 24 });
      
      // check db has req.body.email
      const userData = await User.findOne({
        where: {
          email: email
        }
      });
    
      if (userData) {
        res.status(409).send("User already existed.");
      }
      else {
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
  
        const mailOptions = {
          from: `"TravelHelp" <${process.env.NODEMAILER_USER}>`,
          to: newUser.dataValues.email,
          subject: "Verify your TravelHelp account",
          text: `Almost done, ${newUser.dataValues.name}!
          
          To activate your TravelHelp account, we just need yo verify your email address:        
          
          http://localhost:3355/users/auth/?token=${generatedAuthToken}
  
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
            res.status(201).send("Please verify your email address");
          }
          smtpTransporter.close();
        });
      }
    }
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 403).json({
        message: err.message || 'Your token may have problem. You can resend verification mail from sign in page. If you still have problem, please contact us: (contact information)'
      });
    }
    
  }
};
