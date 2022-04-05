import * as fs from 'fs/promises';
import * as Jwt from 'jsonwebtoken';

const validateToken = async (token: any) => {
  const SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');
  const decode = Jwt.verify(token, SECRET);

  return decode;
};

export default validateToken;
