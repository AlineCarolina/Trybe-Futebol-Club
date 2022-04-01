import { Request, Response, NextFunction } from 'express';
import matchsService from '../services/matchsService';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { inProgress } = req.query;
  try {
    const matchs = inProgress ? await
    matchsService.getInProgress(inProgress === 'true') : await
    matchsService.getAll();

    return res.status(200).json(matchs);
  } catch (error) {
    next(error);
  }
};

export default getAll;
