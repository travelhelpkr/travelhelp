# Travel Help

#### *'Multilanguage'* and *'Responsive'* Website Concierge service for the foreign travelers in Korea.

<img src="https://user-images.githubusercontent.com/66960200/99899105-0141f000-2cea-11eb-94f8-d33fadd7e266.png" alt="1" width="90%"/>

## Getting Started

### Prerequisites
- npm: npm install separately in `client` and `server` each.

```
/client npm install
/server npm install
```


#### create security files listed on `.gitignore`
- `.env`
  - path: should have located on the `travelhelp/server/`.
  - includes:
    MYSQL_USER_NAME="(your username)"
    MYSQL_PASSWORD="(your password)"
    MYSQL_DATABASE="(your database name)"
    MYSQL_HOST="(your databse host location)"
    MYSQL_PORT="(your database port)"
    SQL_DIALECT="mysql"
    
    SESSION_SECRET="(your secret keyword)"
    
    SERVER_PORT="(your nodejs server port)" 
    
    NODEMAILER_USER="(your available gmail id)"
    NODEMAILER_PASS="(your gmail password)"

  - note: NODEMAILER by gmail id requires security setting.
  "less secure" setting from your account, and "CAPTCHA Enable". Additionally, if your gmail account protected by 2FA, you should create an "Application Specific".
  check this out from [the official document of NODEMAILER](https://nodemailer.com/usage/using-gmail)

- `google.json` && `line.json`
  - path: should have located on the `travelhelp/server/config/`.
  - you can receive `google.json` and `line.json` files once you fullfilled their requirement from developer page.
  - [google cloud platform](https://console.cloud.google.com/apis/credentials/oauthclient)
  - [line developer console](https://developers.line.biz/en/services/line-login/)


### Versions
```
nodeJS v14.15.0 (nvm v0.36.0)
npm v6.14.8
mysql(AWS RDS) ^8.0.20
```

### Config information
You need 4 config environments information.
- AWS RDS information  `/server/.env`
- Google Oauth Client API Keys  `/server/config/google.json`
- Line Oauth Client API Keys  `/server/config/line.json`
- Channel Talk API Keys  `/client/src/config/channelTalk.json`


## Built With
* [React](https://reactjs.org/) - Frontend, framework
* [NodeJS](https://nodejs.org/en) - Backend, server
* [Express](https://expressjs.com/) - Backend, server
* [Mysql](https://www.mysql.com/) - Backend, DB
* [Sequelize](https://sequelize.org/master) - Backend, ORM


## Versioning
- 0.1.0 | Nov/22/2020
  - Released
  
## License
This project is licensed under the MIT License.

## Contributors
* **[Brother Kim](https://github.com/imbrok)**
* **[Chaeryn Park](https://github.com/chaerynny)**
