import {
  createLeaderBoard,
  createLeaderBoardAway,
  rankingLeaderBoard,
} from '../middlewares/createLeaderBoard';
import Clubs from '../database/models/clubs';
import Match from '../database/models/match';

const getAll = async () => {
  const allClubs = await Clubs.findAll();
  const dataMatchs: any = await Match.findAll({ where: { inProgress: false },
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] }] });

  const arrayClubs = allClubs.map((club) => ({ name: club.clubName }));

  const score: any = arrayClubs.map((club) => {
    const filterMatchs = dataMatchs.filter((match: any) => club.name === match.homeClub.clubName);

    const result = createLeaderBoard(club, filterMatchs);

    return result;
  });

  return rankingLeaderBoard(score);
};

const getAway = async () => {
  const allClubs = await Clubs.findAll();
  const dataMatchs: any = await Match.findAll({ where: { inProgress: false },
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] }] });

  const arrayClubs = allClubs.map((club) => ({ name: club.clubName }));

  const score: any = arrayClubs.map((club) => {
    const filterMatchs = dataMatchs.filter((match: any) => club.name === match.awayClub.clubName);

    const result = createLeaderBoardAway(club, filterMatchs);

    return result;
  });

  return rankingLeaderBoard(score);
};

export default {
  getAll,
  getAway,
};
