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

export default UserInterface;
export { TokenInterface, MatchInterface };
