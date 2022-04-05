import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require ('chai-http');
import { Response } from 'superagent';

import Clubs from '../database/models/clubs';
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;


describe('teste/clubs:id', () => {
  let response: Response;

  before(() => {
    sinon.stub(Clubs, 'findByPk').resolves({
      id: 1,
      clubName: 'Club 1',
    } as Clubs);
    });

  after(() => {
    (Clubs.findByPk as sinon.SinonStub).restore();
  });

  it('retorna mensagem correta', async () => {
    response = await chai.request(app).get('/clubs/1');

    console.log(response.body);

    expect(response.body).to.be.eql({ id: 1, clubName: 'Club 1' });
  });

  it('retona status 200', async () => {
    response = await chai.request(app).get('/clubs/1');

    expect(response).to.have.status(200);
  });

  
});