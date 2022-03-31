import Club from '../database/models/clubs';

const getClubs = async () => {
  const clubs = await Club.findAll();
  return clubs;
};

const getById = async (id: number) => {
  const clubId = await Club.findByPk(id);
  return clubId;
};

export default {
  getClubs,
  getById,
};
