import 'mocha';
import { expect } from 'chai'
import request from 'supertest'

const server = request.agent('http://localhost:3355'); // agent로 계속 연결 유지시켜주기.

describe('cart-add', () => {

  it(`should respond with 200 status and 'menu added in user cart' when new menu is added to cart`, (done) => {
    server
    .post('/api/foods/cart')
    .send({
      "user_id": 11,
      "menu_id": 2,
      "option_id":2
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('menu added in user cart');
      return done();
    })
  })

  it(`should respond with 409 error and 'only same restaurant order is available' when there is existing menu from other restaurant`, (done) => {
    server
    .post('/api/foods/cart')
    .send({
      "user_id": 11,
      "menu_id": 19
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(409);
      expect(res.body.conflict).to.equal(true);
      expect(res.body.message).to.equal('only same restaurant order is available');
      return done();
    })
  })

  it(`should respond with 409 error and 'this menu already exists in the user cart' when there is existing menu`, (done) => {
    server
    .post('/api/foods/cart')
    .send({
      "user_id": 11,
      "menu_id": 2,
      "option_id":2
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(409);
      expect(res.body.message).to.equal('this menu already exists in the user cart');
      return done();
    })
  })

})


describe('cart-show', () => {

  it(`should respond with 200 status and 'empty cart' when there is no menu in the cart`, (done) => {
    server
    .get('/api/foods/cart/4')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.message).to.equal('empty cart');
      return done();
    })
  })

  it(`should respond with 200 status and 2 arrays of cart and 1 of restaurant information`, (done) => {
    server
    .get('/api/foods/cart/11')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.cart).to.have.length(2);
      expect(res.body).to.have.property('restaurant');
      return done();
    })
  })
  
  it(`should respond with 200 status and 'quantity', 'Order', 'Menu', 'Option' in the cart array`, (done) => {
    server
    .get('/api/foods/cart/11')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.cart[0]).to.all.keys('quantity', 'Order', 'Menu', 'Option');
      return done();
    })
  })

  it(`should respond with 200 status and 'id' in the cart-Order array`, (done) => {
    server
    .get('/api/foods/cart/11')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.cart[0].Order).to.all.keys('id');
      return done();
    })
  })

  it(`should respond with 200 status and 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'price', 'restaurant_id' in the cart-Menu array`, (done) => {
    server
    .get('/api/foods/cart/11')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.cart[0].Menu).to.all.keys('id', 'image', 'name_en', 'name_zh', 'name_ja', 'price', 'restaurant_id');
      return done();
    })
  })

  it(`should respond with 200 status and 'id', 'name_en', 'name_zh', 'name_ja', 'price' in the cart-Option array`, (done) => {
    server
    .get('/api/foods/cart/11')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.cart[0].Option).to.all.keys('id', 'name_en', 'name_zh', 'name_ja', 'price');
      return done();
    })
  })

  it(`should respond with 200 status and 'id', 'name_en', 'name_zh', 'name_ja', 'category_en', 'category_zh', 'category_ja', 'operation_hour', 'minimum_price', 'delivery_fee' in the restaurant array`, (done) => {
    server
    .get('/api/foods/cart/11')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.restaurant).to.all.keys('id', 'name_en', 'name_zh', 'name_ja', 'category_en', 'category_zh', 'category_ja', 'operation_hour', 'minimum_price', 'delivery_fee');
      return done();
    })
  })

})


describe('cart-update', () => {

  it(`should respond with 200 status and 'successfully updated menu quantity' when quantity of menu is updated`, (done) => {
    server
    .put('/api/foods/cart')
    .send({
      "order_id": 13,
      "menu_id": 1,
      "option_id": 2,
      "quantity": 2
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.message).to.equal('successfully updated menu quantity');
      return done();
    })
  })

})


describe('cart-delete', () => {

  it(`should respond with 200 status and 'successfully deleted the menu' when menu is deleted`, (done) => {
    server
    .delete('/api/foods/cart?order_id=13&menu_id=2&option_id=2')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.body.message).to.equal('successfully deleted the menu');
      return done();
    })
  })

})