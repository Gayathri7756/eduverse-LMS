import { Response, NextFunction } from 'express';
import { ProgressService } from './progress.service';
import { AuthRequest } from '../../middleware/auth';

export const updateProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const progress = await ProgressService.upsertProgress((req.user!.userId as string), (req.params.videoId as string), req.body);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const progress = await ProgressService.getProgressByVideo((req.user!.userId as string), (req.params.videoId as string));
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getSubjectProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await ProgressService.getSubjectProgress((req.user!.userId as string), (req.params.subjectId as string));
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
