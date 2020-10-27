const app = require('express')();
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3355;
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome to the travel help!');
})

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

module.exports = app;
