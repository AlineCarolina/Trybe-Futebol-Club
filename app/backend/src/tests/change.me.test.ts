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
    expect(response.body).to.be.an('object');
  });

  it('quando o email não é informado para realizar o login', async () => {
    response = await chai.request(app).post('/login').send({
      password: 'secret_user',
    });
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.eq('All fields must be filled');
  });

  it('quando o email não tem o formato esperado', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'user.user.br',
      password: 'secret_user',
    });
    expect(response).to.be.eq(401);
    expect(response.body.message).to.be.eq('Incorrect email or password');
  });

  it('quando a senha tem menos de 6 caracteres', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'admin',
  });
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.eq('All fields must be filled');
  });

  it('quando o email não esta cadastrado', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'teste@teste.com',
      password: 'secret_user',
  });
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.eq('Usuário não cadastrado');
  });

  it('quando a senha esta incorreta', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_user_teste',
    });
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.eq('Incorrect email or password');
  });

});
