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

export default UserInterface;
export { TokenInterface };
