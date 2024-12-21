import express from 'express';
import { createTodo, listTodos, markTodoAsCompleted } from '../controllers/todoController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { todoValidationSchema } from '../validations/todoValidation.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', async (req, res, next) => {
  const { error } = todoValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}, createTodo);


router.get('/', listTodos);
router.patch('/:id/completed', markTodoAsCompleted);

export default router;
