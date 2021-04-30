const { responseMapper, processTransactionRequests } = require('../services/converter');
const { asyncAwaitRequest } = require('../helper/asyncAwaitRequest');

const ERROR_CODES = require('../constants/errorCodes');
const converterService = require('../services/converter');
const logger = require('../helper/logger');

/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getTransactions = async (req, res) => {
  try {
    const options = converterService.exchangeRateRequestOptions(req.method);
    let result = await asyncAwaitRequest(options);
    result = result.statusCode === 200 ? responseMapper(result.data) : result.data;
    res.send(result);
  } catch (err) {
    logger.log(3, 'Controller', 'Exchange Currency Transaction', 'getTransactions', 'Failed to get transactions ', err);
    res.send(err.error_code ? err : { error_code: ERROR_CODES.GET_TRANSACTION_DATA_ERROR_CONTROLLER });
  }
};

/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const processTransactions = async (req, res) => {
  try {
    const options = converterService.exchangeRateRequestOptions(req.method);
    const { transactions } = req.body;
    const result = await processTransactionRequests(transactions, options);
    res.send(result);
  } catch (err) {
    logger.log(3, 'Controller', 'Convert Currency', 'processTransactions', 'Failed to process transactions ', err);
    res.send(err.error_code ? err : { error_code: ERROR_CODES.PROCESS_TRANSACTION_DATA_ERROR_CONTROLLER });
  }
};

module.exports = {
  processTransactions,
  getTransactions
};
