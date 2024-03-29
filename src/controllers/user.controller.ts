import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";
import Ubication from '../models/ubication.models';
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
  const { targetId, loggedId } = req.params;
  const { id: userId, ...body } = req.body;

  try {
    // Encrypt the password
    if (body.password) {
      const salt = bcryptjs.genSaltSync();
      body.password = bcryptjs.hashSync(body.password, salt);
    }

    // Check if logged user is ADMIN role
    const logguedUser = await User.findOne({ where: { id: loggedId } });
    const { rol, name } = logguedUser?.dataValues;

    if (rol !== 'ADMIN' && targetId !== loggedId) {
      res.json({
        msg: `The user with name: ${name} have not the require authorization`,
      });
    }

    // Update and get the updated ser
    await User.update(body, { where: { id: targetId } });
    const user = await User.findByPk(targetId);

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
  const { city } = body;
  try {
    // Build new user
    const user = await User.build(body);

    // Encrypt the password
    const salt = bcryptjs.genSaltSync();
    const userPassword = user.getDataValue('password');
    const userPasswordEncrypted = bcryptjs.hashSync(userPassword, salt);
    user.setDataValue('password', userPasswordEncrypted);

    // Save the ubication ID
    const ubication = await Ubication.findOne({ where: { city } });
    if (ubication) user.setDataValue('ubicationId', ubication.dataValues.id);
    else throw new Error(`Ubication with name ${body.city} not exist.`);


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

export const contratedUser = async (req: Request, res: Response) => {
  const { clientId, profesionalId } = req.params;

  try {
    // Get the client and profesional
    const user = await User.findByPk(clientId);
    const contratedUser = await User.findByPk(profesionalId);

    // Actualize the client/profesional ids
    const { id: idClient, ...clientBody } = user?.dataValues;
    const { id: idProfesional, ...profesionalBody } = contratedUser?.dataValues;

    // Check if contrated user are the right rol
    if (contratedUser?.dataValues.rol !== 'PROFESIONAL') {
      throw new Error(`Ubication with name ${profesionalId} not exist.`);
    }

    // Update the Database
    await user?.update({ ...clientBody, profesionalId: profesionalId }, { where: { id: clientId } });
    await contratedUser?.update({ ...profesionalBody, cliendId: clientId }, { where: { id: profesionalId } });

    res.json({
      msg: 'User contracted',
      id: profesionalBody
    });

  } catch (error) {
    console.log('error aca');

    res.status(500).json({ error });
  }
};
