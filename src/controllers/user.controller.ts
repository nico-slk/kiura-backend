import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";
import User from "../models/user.models";

export const testUser = async (_req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server' + Date.now().toLocaleString());
};

export const getUser = async (_req: Request, res: Response) => {
  try {
    const usersList = await User.findAll();
    res.json({
      msj: 'Usuarios',
      usersList
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPaginatedUsers = async (req: Request, res: Response) => {
  const { offset, limit } = req.query;
  const page = parseInt(offset as string);
  const pageSize = parseInt(limit as string);
  try {
    const usersList = await User.findAndCountAll({ limit: pageSize, offset: page });

    res.json({
      msj: 'Usuarios',
      usersList
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUserByPk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    res.json({
      msj: 'Usuario',
      user
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const patchUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId, ...body } = req.body;
  try {
    // Encrypt the password
    if (body.password) {
      const salt = bcryptjs.genSaltSync();
      body.password = bcryptjs.hashSync(body.password, salt);
    }

    // Update and get the updated ser
    await User.update(body, { where: { id } });
    const user = await User.findByPk(id);

    // Response
    res.json({
      msg: 'patchUser',
      user
    });

  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // Build new user
    const user = await User.build(body);

    // Encrypt the password
    const salt = bcryptjs.genSaltSync();
    const userPassword = user.getDataValue('password');
    const userPasswordEncrypted = bcryptjs.hashSync(userPassword, salt);
    user.setDataValue('password', userPasswordEncrypted);

    // Save the new user
    await user.save();

    // Response
    res.json({
      msg: 'createUser',
      user
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.json({
      msg: 'deleteUser',
      id: id
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
