import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import UserInterface from '../interfaces/UserInterface';

const create = async (userToken: UserInterface) => {
  const jwtConfig: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');

  const token = jwt.sign(userToken, secret, jwtConfig);

  return token;
};

export default create;
