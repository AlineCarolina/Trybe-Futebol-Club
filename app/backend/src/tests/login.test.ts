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

  before(() => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    } as User)
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('retorna status 200', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });
    expect(response).to.have.status(200);
  });

  it('retorna um objeto', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });
    console.log(response.status)
    expect(response.body.mensagem).to.be.an('object');
  });

  it('quando o email não é informado para realizar o login', async () => {
    response = await chai.request(app).post('/login').send({
      password: 'secret_admin',
    });
    expect(response.body.message).to.be.equal('All fields must be filled');
    expect(response).to.have.status(401);
  });

   it('quando o email não tem o formato esperado', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin.com',
      password: 'secret_admin',
    });
    expect(response.body.message).to.be.equal('Incorrect email or password');
    expect(response).to.have.status(401);
  });

  it('quando a senha tem menos de 6 caracteres', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'admin',
    });
    expect(response.body.message).to.be.equal('All fields must be filled');
    expect(response).to.have.status(401);
  });

  it('quando o email não esta cadastrado', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'teste@teste.com',
      password: 'secret_admin',
    });
    expect(response.body.message).to.be.equal('Incorrect email or password');
    expect(response).to.have.status(401);
  });

  it('quando a senha esta incorreta', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin_teste',
    });
    expect(response.body.message).to.be.equal('Incorrect email or password');
    expect(response).to.have.status(401);
  });

});
