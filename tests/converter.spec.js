'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const mockData = {
  transactions: [
    {
      createdAt: '2021-04-30T00:42:56.857Z',
      currency: 'AED',
      amount: 775,
      checksum: 'f55824c1-f4c8-408d-80cb-fd5070a9f5bf',
      convertedAmount: 4.4532
    },
    {
      createdAt: '2021-04-30T00:42:56.857Z',
      currency: 'AFN',
      amount: 908,
      checksum: '26602814-d57b-493a-b869-6ad37c415ab8',
      convertedAmount: 94.0227
    },
    {
      createdAt: '2021-04-30T00:42:56.857Z',
      currency: 'ALL',
      amount: 174,
      checksum: '00e20874-726e-4d85-b90b-61960945cbfc',
      convertedAmount: 123.2112
    }
  ]
};

chai.should();
chai.use(chaiHttp);

describe('Currency Exchange Converter', () => {
  it('should return 404 on invalid API request', done => {
    chai
      .request(app)
      .get('/transactions-list')
      .end((err, res) => {
        res.should.have.status(404);
        expect(err).to.not.be.undefined;
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('should return all current exchange rates', async () => {
    const result = await chai.request(app)
      .get(`/transactions`).send();

    expect(result.status).to.equal(200);
    expect(result.body).not.to.be.empty;
    expect(result.body).to.not.be.undefined;
    expect(result.body).to.be.an('array').that.is.not.empty;
    expect(result.body[0]).to.have.keys(['createdAt', 'currency', 'amount', 'exchangeUrl', 'checksum', 'convertedAmount']);
  });

  it('should convert and process transactions for the given data', async () => {
    const result = await chai.request(app)
      .post(`/transactions`).send(mockData);

    expect(result.status).to.equal(200);
    expect(result.body).not.to.be.empty;
    expect(result.body).to.not.be.undefined;
    expect(result.body).to.be.an('object').that.is.not.empty;
    expect(result.body).to.have.keys(['success', 'passed', 'failed']);
    expect(result.body.success).to.be.true;
    expect(result.body.passed).to.equal(3);
    expect(result.body.failed).to.equal(0);
  });

  it('should validate transaction body by joi', async () => {
    const copyMockData = mockData.transactions.map(data => data);
    copyMockData[0].convertedAmount = 0.652365;

    const result = await chai.request(app)
      .post(`/transactions`).send({ transactions: copyMockData });

    expect(result.status).to.equal(422);
    expect(result.body).to.not.be.empty;
    expect(result.body).to.not.be.undefined;
    expect(result.body).to.have.keys(['error']);
    expect(result.body.error).to.equal('"transactions[0].convertedAmount" must have no more than 4 decimal places');
  });
});
