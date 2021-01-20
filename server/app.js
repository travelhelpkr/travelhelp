const app = require('express')();
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');
const foodRouter = require('./router/foodRouter');
const passport = require('passport');
const env = process.env.NODE_ENV || 'production';
const config = require('./config/config.js')[env];
const port = process.env.SERVER_PORT || 8080;
const dotenv = require('dotenv');
dotenv.config();

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
const AWS = require('aws-sdk'),
    region = "ap-northeast-2",
    secretName = "prod/testConfig",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
const client = new AWS.SecretsManager({
    region: region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
    }
    else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
            secret = data.SecretString;
        } else {
            let buff = new Buffer.from(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
        }
    }
    console.log('secret', secret);
    console.log('decoded binary secret', decodedBinarySecret);
    // Your code goes here. 
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(cors({
  origin: config.client_url,
  credentials: true
}));

// declare env variable for managing session
const options = {
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database
}
const sessionStorage = new mysqlStore(options);

// mysql session managing
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStorage,
    cookie: {
      // cookie availables for a day
      maxAge: 6000 * 60 * 24
      
      // samesite setting for production level
      // sameSite: 'none',
      // secure: true,
    }
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session())

// routing
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/foods', foodRouter);

app.get('/', (req, res) => {
  // console.log('sessison: ', req.session);
  // console.log('cookies: ', req.cookies);
  res.send('welcome to the travel help!');
})

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});

module.exports = app;
