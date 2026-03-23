import { Router } from 'express';
import * as SubjectController from './subjects.controller';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

router.get('/', SubjectController.getAll);
router.get('/:id', SubjectController.getById);
router.get('/:id/tree', authMiddleware, SubjectController.getTree);

export default router;
