import { MatchInterface } from '../interfaces/UserInterface';
import Clubs from '../database/models/clubs';
import Match from '../database/models/match';

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
    return false;
  }
  const newMatch = await Match.create(reqBody);
  return newMatch;
};

const update = async (id: number) => {
  await Match.update({ inProgress: false }, { where: { id } });
};

export default {
  getAll,
  getInProgress,
  create,
  update,
};
