'use strict';

const converterController = require('../controllers/converter');
const app = require('../app');
const middleware = require('../middlewares/joiValidation');
const schemas = require('../models/joiSchemas');

app
  .get('/transactions', converterController.getTransactions)
  .post('/transactions', middleware(schemas.processTransaction, 'body'), converterController.processTransactions);
