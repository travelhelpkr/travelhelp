import 'mocha';
import { expect } from 'chai';
import request from 'supertest';

const server = request.agent('http://localhost:3355'); // keep connection with the server with the agent

describe('app', () => {

  it(`should respond with text message 'welcome to the Travel Help!'`, (done) => {
    server
    .get('/')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.text).to.equal('welcome to the Travel Help!');
      return done();
    });
  })
  
});