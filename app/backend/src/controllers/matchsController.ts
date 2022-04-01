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
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

  try {
    if (!inProgress) return res.status(401).json({ message: 'Match must be in progress' });

    const objMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };

    const created = await matchsService.create(objMatch);

    if (!created) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

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

export default {
  getAll,
  create,
  update,
};
