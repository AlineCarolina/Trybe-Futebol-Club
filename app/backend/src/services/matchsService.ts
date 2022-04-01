import { MatchInterface } from '../interfaces/UserInterface';
import Clubs from '../database/models/clubs';
import Match from '../database/models/match';
import verifyTeam from '../validations/verifyTeam';

const getAll = async () => {
  const matchs = await Match.findAll({
    include: [
      {
        model: Clubs,
        as: 'homeClub',
        attributes: ['clubName'],
      },
      {
        model: Clubs,
        as: 'awayClub',
        attributes: ['clubName'],
      },
    ],
  });
  return matchs;
};

const getInProgress = async (inProgress: boolean) => {
  const result = await Match.findAll({ where: { inProgress },
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] }] });

  return result;
};

const create = async (reqBody: MatchInterface) => {
  if (reqBody.homeTeam === reqBody.awayTeam) {
    return { error: 401, message: 'It is not possible to create a match with two equal teams' };
  }

  const verifyTeams = await verifyTeam([reqBody.homeTeam, reqBody.awayTeam]);

  if (verifyTeams.includes(null)) {
    return { error: 400, message: 'There is no team with such id!' };
  }

  const newMatch = await Match.create(reqBody);

  return newMatch;
};

const update = async (id: number) => {
  await Match.update({ inProgress: false }, { where: { id } });
};

const edit = async (id: number, updateMatch: { homeTeamGoals: number, awayTeamGoals: number }) => {
  const { homeTeamGoals, awayTeamGoals } = updateMatch;

  await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
};

export default {
  getAll,
  getInProgress,
  create,
  update,
  edit,
};
