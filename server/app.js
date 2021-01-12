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
