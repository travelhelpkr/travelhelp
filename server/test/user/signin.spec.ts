import 'mocha';
import { expect } from 'chai'
import request from 'supertest'

const server = request.agent('http://localhost:3355');

describe('signin', () => {

  it(`should respond with 'You need to sign up first.' and status 404 when there is no matching email`, (done) => {
    server
    .post('/api/users/signin')
    .send({
      email: 'bfdasdfasdf@gmail.com'
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(404);
      expect(res.body.message).to.equal('You need to sign up first.');
      return done();
    })
  })

  it(`should respond with 'You need to verify your email first' and status 403 when the email is not verified`, (done) => {
    server
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com'
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(403);
      expect(res.body.message).to.equal('You need to verify your email first');
      return done();
    })
  })

  it(`should respond with 'Wrong password.' and status 401 when the password is wrong`, (done) => {
    server
    .post('/api/users/signin')
    .send({
      email: 'travelhelpkr@gmail.com',
      password: 'wrongpw'
    })
    .end((err: any, res: request.Response) => {
      if(err) return done(err);
      // expect(401);
      expect(res.status).to.equal(401); // same as just 401
      expect(res.body.message).to.equal('Wrong password.');
      return done();
    })
  })

  it(`should respond with sending profile and status 200 when there is matching email&pw`, (done) => {
    server
    .post('/api/users/signin')
    .send({
      email: 'travelhelpkr@gmail.com',
      password: '1234'
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      // expect(res.body).to.all.keys('id', 'name', 'email', 'language');
      expect(res.body).has.all.keys(['id', 'name', 'email', 'language']); // same as to.all
      return done();
    })
  })

})