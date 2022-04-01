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

export default getAll;
