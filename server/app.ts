import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import mysql from 'mysql2/promise';
// import * as expressSession from 'express-session';
import * as expressSession from 'express-session';
import expressMysqlSession from 'express-mysql-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import * as userRouter from './router/userRouter';
// import * as authRouter from './router/authRouter';
// import * as foodRouter from './router/foodRouter';
const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');
const foodRouter = require('./router/foodRouter');
import passport from 'passport';
// import config from './config/config.ts';

dotenv.config();
const app = express();

const env: string = process.env.NODE_ENV || 'production';
// const config: any = config[any];
const config: any = require('./config/config.js')[env];

const port: string | number = process.env.SERVER_PORT || 8080;

const MySQLStore: any = expressMysqlSession(expressSession);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: config.client_url,
  credentials: true
}));

// configurations for session storage && connection pool on mysql
const options: any = {
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database,
  // number of connections when creating a connection pool
  connectionLimit: 10
}

// connecting an existing mysql pool(created by sequelize)
const connection: object = mysql.createPool(options);
const sessionStorage = new MySQLStore(options, connection);

// mysql session managing
app.use(
  expressSession.default({
    secret: config.sessionSecret,
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

app.get('/', (req: Request, res: Response) => {
  //  console.log('sessison: ', req.session);
  //  console.log('cookies: ', req.cookies);
  res.send('welcome to the travel help!');
})

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});

module.exports = app;
