interface UserInterface {
  id?: number;
  username?: string;
  email: string;
  password: string;
  role?: string;
}

interface TokenInterface {
  id?: number;
  username?: string;
  email: string;
  role?: string;
}

interface MatchInterface {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: number,
  message?: string,
}

interface LeaderBoardInterface{
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export default UserInterface;
export { TokenInterface, MatchInterface, LeaderBoardInterface };
