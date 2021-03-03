'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/index')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const http = require('http');
const api = express()

const Promise = require("bluebird");
const mongoose = require('mongoose');
const config = require("./config/index");
const pjson = require('./package.json');

// Promisify All The Mongoose
Promise.promisifyAll(mongoose);

// Connecting Mongo DB
mongoose.connect(config.db, {
  bufferMaxEntries: 0,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

mongoose.connection.on('connected', () => {
    console.log(`${pjson.name} connected to database`)
  })


const rawBodySaver = function (req, _res, buf, encoding) {
    if (buf && buf.length)req.rawBody = buf.toString(encoding || 'utf8');
}

api.use(morgan('dev'))
api.use(helmet())
api.use(bodyParser.json({limit: '50mb', verify: rawBodySaver}));
api.use(bodyParser.urlencoded({ limit: '50mb', verify: rawBodySaver, extended: false }));
api.use(cookieParser());
api.use(cors());


//API ROUTES
api.get("", (req, res) => {
  res.status(200).json({
    message: "Welcome"
  });
});
api.use('/', apiRouter)
api.use(function onError(_err, _req, res) {
  res.statusCode = 500;
  res.end;
});

//API SERVER
const apiServer = http.createServer(api)

apiServer.listen(process.env.PORT || config.port || 3000, () => {
 console.log(`${pjson.name} running on ${config.port}`);
 })
