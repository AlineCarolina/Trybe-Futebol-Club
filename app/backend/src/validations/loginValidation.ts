import { NextFunction, Request, Response } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email) res.status(401).json({ message: 'All fields must be filled' });

  const regex = /\S+@\S+\.\S+/;
  const validEmail = regex.test(email);

  if (!validEmail) res.status(401).json({ message: 'Incorrect email or password' });

  if (password.length < 6) {
    res.status(400).json({
      message: 'Password must be at least 6 characters',
    });
  }

  next();
};

export default loginValidation;
