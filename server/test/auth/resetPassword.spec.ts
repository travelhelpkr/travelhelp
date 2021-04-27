import 'mocha';
import { expect } from 'chai';
import request from 'supertest';

const server = request.agent('http://localhost:3355'); // agent로 계속 연결 유지시켜주기.

describe('resetPassword-sendEmail', () => {

  it(`should respond with 404 status and send message when the email is not existed`, (done) => {
    server
    .post('/api/auth/resetPassword')
    .send({
      email: 'dsfafagasdgfa@gmail.com'
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(404);
      expect(res.body.message).to.equal('You need to sign up first');
      return done();
    })
  })

  it(`should respond with 409 status and send message when the email is not from local`, (done) => {
    server
    .post('/api/auth/resetPassword')
    .send({
      email: 'testUser@gmail.com'
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(409);
      expect(res.body.oauth_provider).to.equal('google');
      expect(res.body.message).to.equal(`You already signed up with the 'google'. Please try again with the social sign in method`);
      return done();
    })
  })

  it(`should respond with 401 status and send message when the email is not verified`, (done) => {
    server
    .post('/api/auth/resetPassword')
    .send({
      email: 'test@gmail.com'
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(401);
      expect(res.body.message).to.equal('You need to verify your email address. Please check your email or resend it from this link');
      return done();
    })
  })

})