import { Response, NextFunction } from 'express';
import { ProgressService } from './progress.service';
import { AuthRequest } from '../../middleware/auth';

export const updateProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const progress = await ProgressService.upsertProgress(req.user!.userId, req.params.videoId, req.body);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const progress = await ProgressService.getProgressByVideo(req.user!.userId, req.params.videoId);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getSubjectProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await ProgressService.getSubjectProgress(req.user!.userId, req.params.subjectId);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
