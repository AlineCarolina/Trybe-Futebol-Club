import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

const getAll = async (_req: Request, res: Response) => {
  const result = await LeaderBoardService;

  res.status(200).json(result);
};

export default getAll;
