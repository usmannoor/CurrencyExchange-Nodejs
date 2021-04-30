const ERROR_CODES = require('../constants/errorCodes');
const logger = require('../helper/logger');
const exchangeRateURL = process.env.EXCHANGE_RATE_URL;
const uuidV4 = require('uuid/v4');
const { asyncAwaitRequest } = require('../helper/asyncAwaitRequest');
const { getRandomNumber } = require('../helper/helperFunctions');
let errorObject = {};

/**
 *
 * @returns {{uri: string, method: *, timeout: number}}
 * @param method
 */
const exchangeRateRequestOptions = (method) => {
  try {
    const uri = method === 'GET' ? 'latest' : 'convert';
    return {
      uri: `${exchangeRateURL}${uri}?access_key=${process.env.EXCHANGE_RATE_API_KEY}`,
      method: method,
      timeout: 6000
    };
  } catch (err) {
    logger.log(3, 'Service', 'Get request options', 'exchangeRateRequestOptions', 'Failed to create exchange rate request options', err);
    errorObject = err.error_code ? err : { error_code: ERROR_CODES.CONVERTER_REQUEST_OPTIONS_ERROR_SERVICE };
    throw errorObject;
  }
};

/**
 *
 * @param data
 * @returns {*}
 */
const responseMapper = (data) => {
  try {
    if (Object.prototype.hasOwnProperty.call(data, 'rates')) {
      const rates = data.rates;
      const currentDateTime = new Date();
      const result = [];

      for (const currency in rates) {
        const resultObj = {};

        resultObj.createdAt = currentDateTime;
        resultObj.currency = currency;
        resultObj.amount = getRandomNumber(1000);
        resultObj.exchangeUrl = `${exchangeRateURL}Y-M-D?base=EUR`;
        resultObj.checksum = uuidV4();
        resultObj.convertedAmount = parseFloat(rates[currency].toFixed(4));

        result.push(resultObj);
      }
      return result;
    }

    return data;
  } catch (err) {
    errorObject = err.error_code ? err : { error_code: ERROR_CODES.RESPONSE_MAPPER_ERROR_SERVICE };
    throw errorObject;
  }
};

const processTransactionRequests = async (transactions, options) => {
  try {
    const promises = [];
    let passed = 0;
    let failed = 0;

    for (const transaction of transactions) {
      options.uri = `${options.uri}&from=${transaction.currency}&to=EUR&amount=${transaction.amount}`;
      promises.push(await asyncAwaitRequest(options));
    }
    const result = await Promise.all(promises);

    // count the number of passed and failed results on the basis of status codes
    result.map(data => {
      passed = data.statusCode === 200 ? ++passed : passed;
      failed = data.statusCode !== 200 ? ++failed : failed;
    });
    return { success: passed === 0, passed: passed, failed: failed };
  } catch (err) {
    errorObject = err.error_code ? err : { error_code: ERROR_CODES.PROCESS_MULTIPLE_REQUESTS_ERROR_SERVICE };
    throw errorObject;
  }
};

module.exports = {
  exchangeRateRequestOptions,
  responseMapper,
  processTransactionRequests
};
