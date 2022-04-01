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

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created: any = await matchsService.create(req.body);

    if (created.error) return res.status(created.status).json(created);

    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await matchsService.update(+id);

    return res.status(200).json({ message: 'Match updated' });
  } catch (error) {
    next(error);
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await matchsService.edit(Number(req.params.id), req.body);
    return res.status(200).json({ message: 'updated' });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  create,
  update,
  edit,
};
