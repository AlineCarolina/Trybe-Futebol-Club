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

  before(async () => {
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

  it('retorna status 200', async () => {
      response = await chai.request(app).get('/clubs');

      expect(response).to.have.status(200);
  });

  it('retorna os clubes do db', async () => {
    response = await chai.request(app).get('/clubs');

    expect(response.body).to.be.eql([
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
    ]);
  });
});