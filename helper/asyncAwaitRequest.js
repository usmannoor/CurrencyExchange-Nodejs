'use strict';
const request = require('request');

const asyncAwaitRequest = (options) => {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error) {
        body = res.statusCode === 200 ? JSON.parse(body) : body;
        resolve({
          statusCode: res.statusCode,
          data: body
        });
      } else {
        const err = {
          statusCode: 500,
          data: error
        };
        reject(err);
      }
    });
  });
};

module.exports = {
  asyncAwaitRequest
};
