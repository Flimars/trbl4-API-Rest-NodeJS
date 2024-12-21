import express from 'express';
import { registerUser, verifyEmail, loginUser } from '../controllers/userController.js';
import { userValidationSchema } from '../validations/userValidation.js'; // Validação
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware de validação
const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body); // Valida os dados do body
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Erro se inválido
  }
  next(); // Continua para o controlador
};

// Rotas de usuário
router.post('/register', validateUser, registerUser); // Validação aplicada
router.get('/verify/:token', verifyEmail);
router.post('/login', loginUser);

export default router;
