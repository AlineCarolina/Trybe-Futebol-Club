import { NextFunction, Request, Response } from 'express';
import loginService from '../services/loginService';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await loginService({ email, password });

    if (user.error !== 200) {
      return res.status(user.error).json({ error: user.message });
    }

    return res.status(200).json(user.message);
  } catch (error) {
    next(error);
  }
};

export default login;
