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

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: Trabalho
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria criada com sucesso!
 *                 category:
 *                   type: object
 *       400:
 *         description: Dados inválidos fornecidos.
 *       500:
 *         description: Erro interno ao criar categoria.
 */


/**
 * @swagger
 * /categories/share:
 *   post:
 *     summary: Compartilhar uma categoria com outro usuário
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: ID da categoria a ser compartilhada
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 description: ID do usuário com quem compartilhar
 *                 example: 2
 *     responses:
 *       201:
 *         description: Categoria compartilhada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria compartilhada!
 *                 share:
 *                   type: object
 *       400:
 *         description: Dados inválidos fornecidos.
 *       500:
 *         description: Erro interno ao compartilhar categoria.
 */
router.post('/share', shareCategory);

/**
 * @swagger
 * /categories/shared:
 *   get:
 *     summary: Listar categorias compartilhadas
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias compartilhadas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do compartilhamento
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       500:
 *         description: Erro ao listar categorias compartilhadas.
 */

router.get('/shared', listSharedCategories);

export default router;
