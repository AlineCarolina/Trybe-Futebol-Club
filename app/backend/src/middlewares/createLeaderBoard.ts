import { LeaderBoardInterface, MatchInterface } from '../interfaces/UserInterface';

const createLeaderBoard = (team: { name: string }, matchs: MatchInterface[]) => {
  const victories = matchs.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  const defeats = matchs.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  const draws = matchs.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  const goals = matchs.reduce((acc, curr) => curr.homeTeamGoals + acc, 0);
  const outGoals = matchs.reduce((acc, curr) => curr.awayTeamGoals + acc, 0);

  return {
    ...team,
    totalPoints: victories.length * 3 + draws.length,
    totalGames: matchs.length,
    totalVictories: victories.length,
    totalDraws: draws.length,
    totalLosses: defeats.length,
    goalsFavor: goals,
    goalsOwn: outGoals,
    goalsBalance: goals - outGoals,
    efficiency: +(((victories.length * 3 + draws.length) / (matchs.length * 3)) * 100).toFixed(2),
  };
};

const createLeaderBoardAway = (team: { name: string }, matchs: MatchInterface[]) => {
  const victories = matchs.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
  const defeats = matchs.filter((match) => match.awayTeamGoals < match.homeTeamGoals);
  const draws = matchs.filter((match) => match.awayTeamGoals === match.homeTeamGoals);
  const goals = matchs.reduce((acc, curr) => curr.awayTeamGoals + acc, 0);
  const outGoals = matchs.reduce((acc, curr) => curr.homeTeamGoals + acc, 0);

  return {
    ...team,
    totalPoints: victories.length * 3 + draws.length,
    totalGames: matchs.length,
    totalVictories: victories.length,
    totalDraws: draws.length,
    totalLosses: defeats.length,
    goalsFavor: goals,
    goalsOwn: outGoals,
    goalsBalance: goals - outGoals,
    efficiency: +(((victories.length * 3 + draws.length) / (matchs.length * 3)) * 100).toFixed(2),
  };
};

const rankingLeaderBoard = (scoreboard: LeaderBoardInterface[]) => scoreboard.sort((a, b) => {
  if (a.totalPoints < b.totalPoints) return 1;
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalVictories < b.totalVictories) return 1;
  if (a.totalVictories > b.totalVictories) return -1;
  if (a.goalsBalance < b.goalsBalance) return 1;
  if (a.goalsBalance > b.goalsBalance) return -1;
  if (a.goalsFavor < b.goalsFavor) return 1;
  if (a.goalsFavor > b.goalsFavor) return -1;
  if (a.goalsOwn < b.goalsOwn) return 1;
  if (a.goalsOwn > b.goalsOwn) return -1;
  return 0;
});

export {
  createLeaderBoard,
  rankingLeaderBoard,
  createLeaderBoardAway,
};
