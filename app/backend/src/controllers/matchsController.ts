import { Request, Response, NextFunction } from 'express';
import matchsService from '../services/matchsService';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const matchs = await matchsService();

    return res.status(200).json(matchs);
  } catch (error) {
    next(error);
  }
};

export default getAll;
