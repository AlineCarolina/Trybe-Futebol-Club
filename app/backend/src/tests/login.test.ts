import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/user';

chai.use(chaiHttp);
const  { expect } = chai;

describe('teste/login', () => {
  let response: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as User)
  });

  after(async () => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('retorna status 200', async () => {
    response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });
    expect(response).to.have.status(200);
    expect(response.body).to.be.property('user');
    expect(response.body).to.be.property('token');
    expect(response.body.user).to.be.property('id');
    expect(response.body.user).to.be.property('username');
    expect(response.body.user).to.be.property('role');
    expect(response.body.user).to.be.property('email');
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
      password: 'teste_secret',
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

describe('teste/validate', () => {
  let response: Response;

  before(async () => {
    sinon.stub(JWT, 'verify').resolves({ role: 'Admin' });
  });

  after(async () => {
    (JWT.verify as sinon.SinonStub).restore();
  });

  it('returns status 200 with the user role', async () => {
    response = await chai
       .request(app)
       .get('/login/validate')
       .set('Authorization', 'fakeToken');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.a('string');
  });

});