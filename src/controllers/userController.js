import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {prisma} from '../config/db.js';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: "katiane4445@gmail.com",
    pass: "yivh fryv qoej mzxe",
  },
});

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email já está em uso.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verified: false,
      },
    });

    const emailToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    const url = `http://localhost:3000/users/verify/${emailToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Confirmação de Email',
      html: `<p>Confirme seu email clicando <a href="${url}">aqui</a></p>`,
    });

    res.status(201).json({ message: 'Usuário criado. Verifique seu email para ativar a conta.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.update({
      where: { email: decoded.email },
      data: { verified: true },
    });

    res.status(200).json({ message: 'Email verificado com sucesso!', user });
  } catch (error) {
    res.status(400).json({ error: 'Token inválido ou expirado.' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Usuário não encontrado.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Senha inválida.' });

    if (!user.verified) return res.status(400).json({ error: 'Verifique seu email antes de fazer login.' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.status(200).json({ message: 'Login bem-sucedido.', token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};

