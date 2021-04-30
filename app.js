const express = require('express');
const helmet = require('helmet');
const app = express();
const compression = require('compression');

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// TODO: Initialize the database connection here like require('./config/connections')

const timeout = require('connect-timeout'); // express v4
app.use(timeout('240s'));
app.get('/', function (req, res) {
  res.send('OK');
});

module.exports = app;
