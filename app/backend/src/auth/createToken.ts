import { readFileSync } from 'fs';
import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import UserInterface from '../interfaces/UserInterface';

const secret = readFileSync('jwt.evaluation.key', 'utf-8');

const create = async (userToken: UserInterface) => {
  const jwtConfig: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const userSecret = await fs.readFile(secret, 'utf-8');

  const token = jwt.sign(userToken, userSecret, jwtConfig);

  return token;
};

export default create;
