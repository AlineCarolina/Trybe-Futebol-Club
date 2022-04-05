import { Request, Response } from 'express';
import matchsService from '../services/matchsService';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matchs = inProgress ? await
  matchsService.getInProgress(inProgress === 'true') : await
  matchsService.getAll();

  return res.status(200).json(matchs);
};

const create = async (req: Request, res: Response) => {
  const created: any = await matchsService.create(req.body);

  if (created.error) return res.status(401).json(created);

  return res.status(201).json(created);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchsService.update(+id);

  return res.status(200).json({ message: 'Match updated' });
};

const edit = async (req: Request, res: Response) => {
  await matchsService.edit(Number(req.params.id), req.body);
  return res.status(200).json({ message: 'updated' });
};

export default {
  getAll,
  create,
  update,
  edit,
};
