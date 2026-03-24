import { Request, Response, NextFunction } from 'express';
import { SubjectService } from './subjects.service';
import { AuthRequest } from '../../middleware/auth';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await SubjectService.getAll();
    res.json(subjects);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await SubjectService.getById(req.params.id as string);
    res.json(subject);
  } catch (err) {
    next(err);
  }
};

export const getTree = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tree = await SubjectService.getTree((req.params.id as string), (req.user!.userId as string));
    res.json(tree);
  } catch (err) {
    next(err);
  }
};
