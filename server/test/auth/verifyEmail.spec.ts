import 'mocha';
import { expect } from 'chai';
import request from 'supertest';

const server = request.agent('http://localhost:3355'); // agent로 계속 연결 유지시켜주기.

describe('verifyEmail-resendEmail', () => {

  it(`should respond with 403 status and redirect to signin page`, (done) => {
    server
    .post('/api/auth/email')
    .send({
      email: 'travelhelpkr@gmail.com'
    })
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(403);
      // expect('Location', '/user/signin');
      expect(res.header.location).to.include('/user/signin'); // same with above 'Location' checking
      done();
    })
  })

})
