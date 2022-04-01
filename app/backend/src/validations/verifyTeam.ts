import Clubs from '../database/models/clubs';

const verifyTeam = async (teams: number[]) => {
  const result = await Promise.all(teams.map((team) => Clubs.findByPk(team)));

  return result;
};

export default verifyTeam;
