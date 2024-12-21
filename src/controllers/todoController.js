import {prisma} from '../config/db.js';
import { todoValidationSchema } from '../validations/todoValidation.js';

export const createTodo = async (req, res) => {
  const { error } = todoValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { title, description, dueDate, categoryId } = req.body;

  try {
    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: Number(categoryId), userId: req.user.id },
      });

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId: req.user.id,
        categoryId: categoryId ? Number(categoryId) : null,
      },
    });

    res.status(201).json({ message: 'Tarefa criada com sucesso!', todo });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
};

export const listTodos = async (req, res) => {
  const { completed, page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
        ...(completed !== undefined && { completed: completed === 'true' }),
      },
      skip: (page - 1) * limit,
      take: parseInt(limit, 10),
      orderBy: { dueDate: 'asc' },
    });

    res.status(200).json(todos);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ error: 'Erro ao listar tarefas.' });
  }
};

export const markTodoAsCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: true },
    });

    res.status(200).json({ message: 'Tarefa concluída!', todo: updatedTodo });
  } catch (error) {
    console.error('Erro ao marcar tarefa como concluída:', error);
    res.status(500).json({ error: 'Erro ao marcar tarefa como concluída.' });
  }
};
