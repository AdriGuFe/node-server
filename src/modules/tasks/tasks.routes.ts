import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from './tasks.schema.js';
import {
  createTaskCtrl,
  listTasksCtrl,
  getTaskCtrl,
  updateTaskCtrl,
  deleteTaskCtrl,
} from './tasks.controller.js';

const router = Router();

// TEMPORAL: simula un usuario autenticado (el usuario 1 ya existe en tu DB)
router.use((req, _res, next) => {
  req.user = { id: 1 };
  next();
});

router.post('/', validate(createTaskSchema), createTaskCtrl);
router.get('/', listTasksCtrl);
router.get('/:id', getTaskCtrl);
router.patch('/:id', validate(updateTaskSchema), updateTaskCtrl);
router.delete('/:id', deleteTaskCtrl);

export default router;