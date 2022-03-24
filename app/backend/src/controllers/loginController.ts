import { NextFunction, Request, Response } from 'express';
import loginService from '../services/loginService';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await loginService({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não cadastrado' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export default login;
