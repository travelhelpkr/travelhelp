import 'mocha';
import { expect } from 'chai'
import request from 'supertest'

const server = request.agent('http://localhost:3355'); // agent로 계속 연결 유지시켜주기.

describe('mypage', () => {

  it(`should respond with 4 arrays of order history information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history).to.have.length(8);
      done();
    })
  })

  it(`should respond with 'id', 'user_id', 'purchased_at', 'Address_book', 'Menus' of order history information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history[0]).to.all.keys('id', 'user_id', 'purchased_at', 'Address_book', 'Menus');
      done();
    })
  })

  it(`should respond with 'id', 'address', 'postal_code', 'contact' of address book information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history[0].Address_book).to.all.keys('id', 'address', 'postal_code', 'contact');
      done();
    })
  })

  it(`should respond with 2 arrays of menu information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history[0].Menus).to.have.length(1);
      done();
    })
  })

  it(`should respond with 'order_id', 'quantity', 'Restaurant', 'Menu', 'Option' of menus information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history[0].Menus[0]).to.all.keys('order_id', 'quantity', 'Restaurant', 'Menu', 'Option');
      done();
    })
  })

  it(`should respond with 'name_en', 'name_zh', 'name_ja', 'delivery_fee' of restaurant information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history[0].Menus[0].Restaurant).to.all.keys('name_en', 'name_zh', 'name_ja', 'delivery_fee');
      done();
    })
  })

  it(`should respond with 'id', 'name_en', 'name_zh', 'name_ja', 'price' of menu information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history[0].Menus[0].Menu).to.all.keys('id', 'name_en', 'name_zh', 'name_ja', 'price');
      done();
    })
  })

  it(`should respond with 'id', 'name_en', 'name_zh', 'name_ja', 'price' of option information`, (done) => {
    server
    .get('/api/users/mypage/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.order_history[0].Menus[0].Option).to.all.keys('id', 'name_en', 'name_zh', 'name_ja', 'price');
      done();
    })
  })
  
})

