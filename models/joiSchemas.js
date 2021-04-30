const Joi = require('joi');

const schemas = {
  processTransaction: Joi.object().keys({
    transactions: Joi.array()
      .items({
        createdAt: Joi.string().required(),
        currency: Joi.string().required(),
        amount: Joi.number().required(),
        convertedAmount: Joi.number().precision(4).required(),
        checksum: Joi.string().required()
      })
  })
};

module.exports = schemas;
