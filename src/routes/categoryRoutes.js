import express from 'express';
import { createCategory, shareCategory, listSharedCategories } from '../controllers/categoryController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { categoryValidationSchema } from '../validations/categoryValidation.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', async (req, res, next) => {
  const { error } = categoryValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}, createCategory);

router.post('/share', shareCategory);
router.get('/shared', listSharedCategories);

export default router;
