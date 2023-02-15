const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const _ = require('lodash');

const config = require('./config/config.json');
const connectiondb = require('./src/middleware/ConnectiondbMiddleware');

const MongoDBConfig = config.MongoDB;
const AppConfig = config.App;
const MaillerConfig = config.Mailler;
const finalConfig = _.merge(MongoDBConfig, MaillerConfig, AppConfig);

global.gConfig = finalConfig;

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(morgan('dev'));

const db = connectiondb.connectToDb();

const Authentification = require('./src/routes/Authentification.js')(app);

let port = global.gConfig.AppPort || 8080;

app.listen(port, () => {
    console.log('listening on port : ' + port);
});