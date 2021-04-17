import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import * as expressSession from 'express-session';
import expressMysqlSession from 'express-mysql-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { Router } from './router';

dotenv.config();
const app: express.Application = express();

const env: string = process.env.NODE_ENV || 'production';
const config: any = require('./config/config.js')[env];
const port: string | number = process.env.SERVER_PORT || 8080;
const MySQLStore: any = expressMysqlSession(expressSession);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
app.use('/api/users', Router.userRouter);
app.use('/api/auth', Router.authRouter);
app.use('/api/foods', Router.foodRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  //  console.log('sessison: ', req.session);
  //  console.log('cookies: ', req.cookies);
  res.send('welcome to the travel help!');
})

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});

export default app;
