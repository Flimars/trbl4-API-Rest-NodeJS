import express from 'express';
import { registerUser, verifyEmail, loginUser } from '../controllers/userController.js';
import { userValidationSchema } from '../validations/userValidation.js'; 

const router = express.Router();

const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body); 
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); 
  }
  next(); 
};

// Rotas de usuário
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/register', validateUser, registerUser); 
router.get('/verify/:token', verifyEmail);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Fazer login de um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/login', loginUser);

export default router;
