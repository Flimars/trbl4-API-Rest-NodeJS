import {prisma} from '../config/db.js';

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: 'Categoria criada com sucesso!', category });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria.' });
  }
};

export const shareCategory = async (req, res) => {
  const { categoryId, userId } = req.body;

  try {
    const share = await prisma.share.create({
      data: { categoryId, userId },
    });

    res.status(201).json({ message: 'Categoria compartilhada!', share });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao compartilhar categoria.' });
  }
};

export const listSharedCategories = async (req, res) => {
  try {
    const sharedCategories = await prisma.share.findMany({
      where: { userId: req.user.id },
      include: { category: true },
    });

    res.status(200).json(sharedCategories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar categorias compartilhadas.' });
  }
};
