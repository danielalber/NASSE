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

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nasse Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple RESTFULL API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "ALBERGUCCI Daniel",
                url: "https://youtube.com",
                email: "daniel.albergucci@epitech.Eu",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

global.gConfig = finalConfig;

const app = express();

app.use(cors());

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', cors(), swaggerUi.setup(specs));

// app.use(
//     "/api-docs",
//     cors(),
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
// );

app.use(helmet());

app.use(bodyParser.json());

app.use(morgan('dev'));

const db = connectiondb.connectToDb();

const Authentification = require('./src/routes/Authentification.js')(app);
const Device = require('./src/routes/Device.js')(app);

var port = global.gConfig.AppPort || 8080;

app.listen(port, () => {
    console.log('listening on port : ' + port);
});