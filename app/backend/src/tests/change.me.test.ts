import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;

describe('Requisito 5 - teste rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne').resolves({
        id: 1,
        username: 'Teste',
        role: 'teste',
        email: 'teste@teste.com',
        password: 'teste',
      } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('é possível fazer o login com dados corretos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'teste@teste.com',
      password: 'teste',
    });
    expect(chaiHttpResponse).to.have.status(200);
  })

  it('quando o email ou senha não é valido retorna status 401', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'erro@erro',
      password: 'erro',
    });
    expect(chaiHttpResponse).to.be.eq(401);
  });
});
