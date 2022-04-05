import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require ('chai-http');
import { Response } from 'superagent';

import Match from '../database/models/match';
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('teste/matchs', () => {
  let response: Response;

  before(() => {
      sinon.stub(Match, 'findAll').resolves([
        {
            id: 1,
            homeTeam: 16,
            homeTeamGoals: 1,
            awayTeam: 8,
            awayTeamGoals: 1,
            inProgress: false
        },
        {
            id: 2,
            homeTeam: 9,
            homeTeamGoals: 1,
            awayTeam: 14,
            awayTeamGoals: 1,
            inProgress: false
        },
        {
            id: 3,
            homeTeam: 4,
            homeTeamGoals: 3,
            awayTeam: 11,
            awayTeamGoals: 0,
            inProgress: false
        },
      ] as Match[]);
  });

  after(() => {
      (Match.findAll as sinon.SinonStub).restore();
  });

  it('retorna status mensagem correta', async () => {
		response = await chai.request(app).get('/matchs');

		expect(response).to.have.status(200);			
	});
});

describe('teste POST /matchs', () => {
  let response: Response;
  
  before(() => {
      sinon.stub(Match, 'create').resolves({
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: true
      } as Match);
  });
  
  after(() => {
      (Match.create as sinon.SinonStub).restore();
  });
  
  it('retorna status mensagem correta', async () => {
          response = await chai.request(app).post('/matchs').send({
              homeTeam: 16,
              homeTeamGoals: 1,
              awayTeam: 8,
              awayTeamGoals: 1,
              inProgress: true
          });
  
          expect(response).to.have.status(201);			
      });
});

describe('teste PATCH /matchs/:id/finish', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'findByPk').resolves({
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: true
    } as Match);
    sinon.stub(Match, 'update').resolves();
});

  after(() => {
    (Match.update as sinon.SinonStub).restore();
    (Match.findByPk as sinon.SinonStub).restore();
  });

  it('retorna status mensagem correta', async () => {
    response = await chai.request(app).patch('/matchs/1/finish');

    expect(response).to.have.status(200);
  });
});

describe('teste PATCH /matchs/:id', () => {
  let response: Response;

  before(() => {
    sinon.stub(Match, 'findByPk').resolves({
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: true
    } as Match);
    sinon.stub(Match, 'update').resolves();
});

  after(() => {
    (Match.findByPk as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
  });

  it('retorna status mensagem correta', async () => {
    response = await chai.request(app).patch('/matchs/1').send({
      homeTeamGoals: 2, awayTeamGoals: 1 });

    expect(response).to.have.status(200);
  });
});
