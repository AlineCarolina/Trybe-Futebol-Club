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

const create = async (reqBody: object) => {
  const newMatch = await Match.create(reqBody);
  return newMatch;
};

export default {
  getAll,
  getInProgress,
  create,
};
