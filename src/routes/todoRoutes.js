import express from 'express';
import { createTodo, listTodos, markTodoAsCompleted } from '../controllers/todoController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { todoValidationSchema } from '../validations/todoValidation.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Gerenciamento de tarefas (todos)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - dueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da tarefa
 *         title:
 *           type: string
 *           description: Título da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Data de vencimento da tarefa
 *         completed:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 *         categoryId:
 *           type: integer
 *           nullable: true
 *           description: ID da categoria associada à tarefa
 *         userId:
 *           type: integer
 *           description: ID do usuário dono da tarefa
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa criada com sucesso!"
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro ao criar a tarefa
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Lista as tarefas do usuário autenticado
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filtra as tarefas pelo status de conclusão
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de tarefas por página
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Erro ao listar tarefas
 */

/**
 * @swagger
 * /todos/{id}/completed:
 *   patch:
 *     summary: Marca uma tarefa como concluída
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa concluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa concluída!"
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro ao marcar tarefa como concluída
 */
router.post('/', async (req, res, next) => {
  const { error } = todoValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}, createTodo);


router.get('/', listTodos);
router.patch('/:id/completed', markTodoAsCompleted);

export default router;
