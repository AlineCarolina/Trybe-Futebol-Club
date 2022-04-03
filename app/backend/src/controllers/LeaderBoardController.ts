import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await LeaderBoardService.getAll();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
};
