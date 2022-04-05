import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require ('chai-http');
import { Response } from 'superagent';

import Clubs from '../database/models/clubs';
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('teste/clubs', () => {
  let response: Response;

  before(() => {
    sinon.stub(Clubs, 'findAll').resolves([
        {
            id: 1,
            clubName: 'Club 1',
        },
        {
            id: 2,
            clubName: 'Club 2',
        },
        {
            id: 3,
            clubName: 'Club 3',
        }
    ] as Clubs[]);
  });

  after(() => {
      (Clubs.findAll as sinon.SinonStub).restore();
  });

  it('retona os clubs do db', async () => {
      response = await chai.request(app).get('/clubs');
      
      expect(response.body).to.be.an('object');
  })

  it('retorna status 200', async () => {
    response = await chai.request(app).get('/clubs');
   
    expect(response).to.have.status(200);
    expect(response.body).to.have.an('array');
  });

});