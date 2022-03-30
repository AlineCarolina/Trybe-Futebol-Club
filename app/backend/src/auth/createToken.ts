import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import { TokenInterface } from '../interfaces/UserInterface';

const create = async ({ id, username, role, email }: TokenInterface) => {
  const jwtConfig: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');

  const token = jwt.sign({ id, username, role, email }, secret, jwtConfig);

  return token;
};

export default create;
