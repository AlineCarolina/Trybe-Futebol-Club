import { NextFunction, Request, Response } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const regex = /\S+@\S+\.\S+/;
  const validEmail = regex.test(email);

  if (!validEmail) {
    return res.status(400).json({
      message: 'Invalid email',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters',
    });
  }
  next();
};

export default loginValidation;
