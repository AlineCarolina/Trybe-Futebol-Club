import { Request, Response } from 'express';
import validateToken from '../auth/validateToken';
import loginService from '../services/loginService';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await loginService({ email, password });

  if (user.error !== 200) {
    return res.status(user.error).json({ message: user.message });
  }

  return res.status(200).json(user.message);
};

const validate = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decode: any = await validateToken(authorization);

  if (!decode) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  return res.status(200).send(`${decode.role}`);
};

export default {
  login,
  validate,
};
