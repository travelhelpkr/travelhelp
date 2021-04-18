import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import * as session from 'express-session';
import expressMysqlSession from 'express-mysql-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { routes } from './routes';

dotenv.config();
const app: express.Application = express();

// server environments
const env: string = process.env.NODE_ENV || 'production';
const config = require('./config/config.js')[env];



/************************************************************************************
 *                       Express session setting with MySQL
 ***********************************************************************************/

// configurations for session storage && connection pool on mysql
const options = {
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database,
  // number of connections when creating a connection pool
  connectionLimit: 10
}
// connecting an existing mysql pool(created by sequelize)
const MySQLStore = expressMysqlSession(session);
const connection: object = mysql.createPool(options);
const sessionStorage = new MySQLStore(options, connection);



/************************************************************************************
 *                       Set Express server app middlewares
 ***********************************************************************************/

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: config.client_url,
  credentials: true
}));

// mysql session managing
app.use(
  session.default({
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

// set API routing
app.use('/', routes);



/************************************************************************************
 *                       Start the Express server app
 ***********************************************************************************/

const port: number = <unknown>process.env.SERVER_PORT as number || 8080;

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});

export default app;
