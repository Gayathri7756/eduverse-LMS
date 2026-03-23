import { Router } from 'express';
import * as ProgressController from './progress.controller';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

router.post('/videos/:videoId', authMiddleware, ProgressController.updateProgress);
router.get('/videos/:videoId', authMiddleware, ProgressController.getProgress);
router.get('/subjects/:subjectId', authMiddleware, ProgressController.getSubjectProgress);

export default router;
