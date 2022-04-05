import { Request, Response } from 'express';
import clubsService from '../services/clubsService';

const getClubs = async (req: Request, res: Response) => {
  const clubs = await clubsService.getClubs();

  return res.status(200).json(clubs);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const club = await clubsService.getById(+id);

  return res.status(200).json(club);
};

export default {
  getClubs,
  getById,
};
