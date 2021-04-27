import 'mocha';
import { expect } from 'chai'
import request from 'supertest'

const server = request.agent('http://localhost:3355'); // agent로 계속 연결 유지시켜주기.

describe('menu', () => {

  it(`should respond with 200 status, 16 arrays of menu and 1 array of restaurant information`, (done) => {
    server
    .get('/api/foods/menu?restaurant_id=1')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.menu).to.have.length(16);
      expect(res.body).to.have.property('restaurant');
      return done();
    })
  })

  it(`should respond with 200 status and 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'price', 'restaurant_id', 'Options' in the menu array`, (done) => {
    server
    .get('/api/foods/menu?restaurant_id=1')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.menu[0]).to.all.keys('id', 'image', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'price', 'restaurant_id', 'Options');
      return done();
    })
  })

  it(`should respond with 200 status and 2 arrays of menu-Options`, (done) => {
    server
    .get('/api/foods/menu?restaurant_id=1')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.menu[0].Options).to.have.length(2);
      return done();
    })
  })

  it(`should respond with 200 status and 'id', 'name_en', 'name_zh', 'name_ja', 'price' in the menu-Options array`, (done) => {
    server
    .get('/api/foods/menu?restaurant_id=1')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.menu[0].Options[0]).to.all.keys('id', 'name_en', 'name_zh', 'name_ja', 'price');
      return done();
    })
  })

  it(`should respond with 200 status and 'id', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'operation_hour', 'minimum_price', 'delivery_fee' in the restaurant`, (done) => {
    server
    .get('/api/foods/menu?restaurant_id=1')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.restaurant).to.all.keys('id', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'operation_hour', 'minimum_price', 'delivery_fee');
      return done();
    })
  })
  
})