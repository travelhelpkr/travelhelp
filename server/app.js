const app = require('express')();
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');
const foodRouter = require('./router/foodRouter');
const orderRouter = require('./router/orderRouter');
const passport = require('passport');
const port = process.env.SERVER_PORT || 3355;
const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:5533",
  credentials: true
}));

// declare env variable for managing session
const env = process.env;
const options = {
  host: env.host,
  port: env.port,
  user: env.username,
  password: env.password,
  database: env.database
}
const sessionStorage = new mysqlStore(options);

// mysql session managing
app.use(
  session({
    secret: env.secret,
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
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/foods', foodRouter);
app.use('/order', orderRouter);

app.get('/', (req, res) => {
  console.log('session: ', req.session);
  console.log('cookies: ', req.cookies);
  res.send('welcome to the travel help!');
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

module.exports = app;
