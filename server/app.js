const app = require('express')();
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const port = process.env.SERVER_PORT || 3355;
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
  origin: "http://localhost:5533",
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

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

// routing
app.use('/users', userRouter);

app.get('/', (req, res) => {
  console.log('session: ', req.session);
  console.log('cookies: ', req.cookies);
  if (req.session.is_signedIn) {
    console.log('current session ID: ', req.session.id);
    console.log(`${req.session.user_name} visited Travel Help ${req.session.visit_count} times`)
    // send user info to client side as an object
    res.send({is_signedIn: req.session.is_signedIn});
  }
  else{
    res.send('welcome to the travel help!');
  }
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

module.exports = app;
