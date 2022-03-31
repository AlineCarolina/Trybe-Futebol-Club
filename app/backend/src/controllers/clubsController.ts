import { Request, Response, NextFunction } from 'express';
import clubsService from '../services/clubsService';

const getClubs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubs = await clubsService.getClubs();

    return res.status(200).json(clubs);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const club = await clubsService.getById(+id);

    return res.status(200).json(club);
  } catch (error) {
    next(error);
  }
};

export default {
  getClubs,
  getById,
};
