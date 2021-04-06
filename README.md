# Travel Help

#### (deprecated) "Credit card payment" no longer available from Nov/2020. The [eximbay](https://www.eximbay.com/index.do) contraction had been expired.
#### (deprecated) "Automation chatting bot service" no longer available from Nov/2020. The [Channel talk](https://channel.io) service subscription had been expired.

#### *'Multilanguage(EN|CN|JP)'* and *'Responsive'* Website Concierge service for the foreign travelers in Korea.

<img src="https://user-images.githubusercontent.com/66960200/99899105-0141f000-2cea-11eb-94f8-d33fadd7e266.png" alt="1" width="90%"/>

## Getting Started

### [Travel Help Wiki(link)](https://github.com/travelhelpkr/travelhelp/wiki)

### Prerequisites
- Client: `Create React App`
- Server: `Express`
- ORM: `Sequelize` 
- npm: npm install separately in `client` and `server` each.
```
/client npm install
/server npm install
```

### Versions
```
nodeJS v14.15.1
npm v7.5.3
mysql(AWS RDS) v8.0.21
```
others can be checked from `server/package.json` and `client/package.json`

### Configuration information (`.env` file)
You need to set 4 configurations. And most of the values should be stored in `.env` file.
`.env` files listed on `.gitignore` for the security issue.
Make your own `.env` file referring `.sample-env` file.

You can also check detail explanation for settings from `.sample-env`
- DB information  `/server/config/config.js`
  - DB configurations for development & test(stage) & production
- Google Oauth Client API Keys  `/server/config/google.json`
  - [google cloud platform](https://console.cloud.google.com/apis/credentials/oauthclient)
  - Remove the `google client id, secret` from thhis file for security. Set this value from `.env` instead.
- Line Oauth Client API Keys  `/server/config/line.json`
  - [line developer console](https://developers.line.biz/en/services/line-login/)
  - Remove the `line channel id, secret` from this file for security. Set this value from `.env` instead.
- Channel Talk API Keys  `/client/.env`
  - [channel developer guides](https://developers.channel.io/docs)

### NPM scripts (from `/server/package.json`)
- `npm start`: It will trigger express server from 8080 port under production environmnet
- `npm run dev`: It will trigger nodemon & express server from 3355 port under development environmnet
- `npm run prod`: It will trigger nodemon & express server from 3355 port under production environment
- `npm test`: It will trigger unit test with mocha & chai & supertest.
- available environment variables
  - `NODE_ENV=`
    - `development` / `test` / `production` available
      - defalut value is `production`
      - you should update `/server/config/config.js` for custom environment configuration setting
  - `SERVER_PORT=`
    - your express server port
    - default value is `8080`

### NPM scripts (from `/client/package.json`)
- `npm deploy`: It deploys(sync with delete option) `/client/build` folder into the specified AWS S3. `aws` command requires `aws cli`. And it also requires the AWS credential with proper IAM permission for the AWS S3.
- `npm invalidate`: It purges all(`/*`) caches from the CDN(AWS cloudfront). You may need to invalidate after updating static files for updating caches. It requires `aws cli` for using `aws` command. And it also requires AWS credential with proper IAM permission for the AWS CloudFront.

## Versioning
- 0.3.3 | Feb/11/2021
  - MSA settings, now server runs on docker container environment
  - AWS infras also changed for container orchestration
  - diverse CI/CD applied for container orchestration
  - security settings, now secrets are managed with AWS Secrets Manger
  - TypeScrip & TDD applied from frontend side
  - commit signature applied with GPG key
- 0.1.0 | Nov/22/2020
  - Released
  - AWS infra: Rout53, WAF, CloudFront, S3, ALB, ASG, EC2, RDS, NAT
  
## License
This project is licensed under the ISC License.

## Contributors
* **[Brother Kim](https://github.com/imbrok)**
* **[Chaeryn Park](https://github.com/chaerynny)**
