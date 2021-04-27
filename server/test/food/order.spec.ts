import 'mocha';
import { expect } from 'chai'
import request from 'supertest'

const server = request.agent('http://localhost:3355'); // agent로 계속 연결 유지시켜주기.

describe('order-add', () => {

  it(`should respond with 200 status and 'Successfully made your order. Delivery in process' when order is made`, (done) => {
    server
    .post('/api/foods/order/4')
    .send({
      address_book_id: 3,
      address: "157, YangHwa-Ro, DongGyo-Dong",
      postal_code: "03995",
      contact: "01029384748"
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.message).to.equal('Successfully made your order. Delivery in process');
      return done();
    })
  })

  it(`should respond with 200 status and 5 arrays of order history information`, (done) => {
    server
    .get('/api/foods/order/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.recent_address).to.have.length(5);
      return done();
    })
  })

})