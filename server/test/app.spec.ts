import 'mocha';
import { expect } from 'chai';
import request from 'supertest';

const server = request.agent('http://localhost:3355');

// done 사용하면 비동기 테스트로 인식, 비동기 로직 완료 후 done()을 실행하면 테스트 완료.
describe('app', () => {
  it(`should respond with text message 'welcome to the Travel Help!'`, (done) => {
    server
    .get('/')
    .end((err: Error, res: request.Response) => {
      if(err) return done(err);
      expect(200);
      expect(res.text).to.equal('welcome to the Travel Help!');
      done();
    });
  })
});