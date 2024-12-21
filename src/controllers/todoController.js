import {prisma} from '../config/db.js';

export const createTodo = async (req, res) => {
  const { title, description, dueDate, categoryId } = req.body;

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId: req.user.id,
        categoryId,
      },
    });

    res.status(201).json({ message: 'Tarefa criada com sucesso!', todo });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
};

export const listTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.id },
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar tarefas.' });
  }
};

export const markTodoAsCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: true },
    });

    res.status(200).json({ message: 'Tarefa concluída!', todo });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao marcar tarefa como concluída.' });
  }
};
