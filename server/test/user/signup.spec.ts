import 'mocha';
import { expect } from 'chai'
import request from 'supertest'

const server = request.agent('http://localhost:3355');

describe('signup', () => {

  it(`should respond with 'User already existed.' and status 409 when the email is existed`, (done) => {
    server
    .post('/api/users/signup')
    .send({
      email: 'travelhelpkr@gmail.com',
    })
    .end((err:any, res:request.Response) => {
      if(err) return done(err);
      expect(res.body.status).to.equal(409);
      expect(res.body.message).to.equal('User already existed.');
      done();
    })
  })


  /* It requires a new existing email address each time attempt to sign up.
   * That means the DB must remove used email every time.
   * The environment can be changed depend on email providers
   * So it would be better to check it manually
   */
  // it(`should respond with 'Please verify your email address' and status 201 when the signup is completed`, () => {
  //   server
  //   .post('/api/users/signup')
  //   .send({
  //     email: 'testmail@gmail.com',
  //     password: '1234',
  //     name: 'test A',
  //     is_policy_agreed: '1',
  //     language: 'en'
  //   })
  //   .end((err:any, res:request.Response) => {
  //     if(err) throw err;
  //     expect(201);
  //     expect(res.body.message).to.equal('Please verify your email address');
  //   })
  // })

})

