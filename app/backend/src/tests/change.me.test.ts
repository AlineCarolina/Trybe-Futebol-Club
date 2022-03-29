import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);
const  { expect } = chai;

describe('teste/login', () => {
  let response: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    } as User)
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('login realizado com sucesso', async () => {
    response = await chai.request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user',
    });

    expect(response.status).to.be.equal(200);
  });

  it('quando o email ou senha não é valido retorna status 401', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'erro@erro',
      password: 'erro',
    });
    expect(response).to.be.eq(401);
  });

  it('quando o email não é informado', async () => {
    response = await chai.request(app).post('/login').send({
      password: 'secret_user',
    });
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.eq('All fields must be filled');
  })

  it('quando a senha não é informada', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
  });
    expect(response).to.have.status(401);});
});
