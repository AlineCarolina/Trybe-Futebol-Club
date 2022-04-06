import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require ('chai-http');
import { Response } from 'superagent';

import Match from '../database/models/match';
import { app } from '../app';
import Clubs from '../database/models/clubs';

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
    expect(response.body).to.be.an('array');	
	});
});

describe('/matchs query', () => {
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

  it('returns status 200 and an array of corresponding filtered matches', async () => {
    response = await chai
       .request(app)
       .get('/matchs?inProgress=false');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
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

      it('retorna status 401', async () => {
          response = await chai.request(app).post('/matchs').send({
              homeTeam: 99,
              homeTeamGoals: 1,
              awayTeam: 98,
              awayTeamGoals: 1,
              inProgress: true
          });
  
          expect(response).to.have.status(401);			
      })
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

describe('/leaderboard/home', () => {
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

    sinon.stub(Clubs, 'findByPk').resolves({
      id: 1,
      clubName: 'Club 1',
    } as Clubs);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Clubs.findAll as sinon.SinonStub).restore();
    (Clubs.findByPk as sinon.SinonStub).restore();
  });

  it('returns ordered array with correct position and attributes', async () => {
    response = await chai
       .request(app)
       .get('/leaderboard/home');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(3);
    expect(response.body[0]).to.have.property('name');
    expect(response.body[0]).to.have.property('totalPoints');
    expect(response.body[0]).to.have.property('totalGames');
    expect(response.body[0]).to.have.property('totalVictories');
    expect(response.body[0]).to.have.property('totalDraws');
    expect(response.body[0]).to.have.property('totalLosses');
    expect(response.body[0]).to.have.property('goalsFavor');
    expect(response.body[0]).to.have.property('goalsOwn');
    expect(response.body[0]).to.have.property('goalsBalance');
    expect(response.body[0]).to.have.property('efficiency');
  });
});
