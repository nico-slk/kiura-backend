import { Request, Response } from "express";
import Ubication from "../models/ubication.models";
import User from '../models/user.models';

export const testUbication = async (req: Request, res: Response) => {
  // res.send('Welcome to Express & TypeScript Server' + Date.now().toLocaleString());
  console.log(req.query);

  const usersInTheCity = await User.findAll({ where: { ubicationId: req.query.ubicationId } });
  res.send({
    message: "users in the city",
    users: usersInTheCity
  });
};

export const getUbication = async (_req: Request, res: Response) => {
  try {
    const ubicationList = await Ubication.findAll();
    res.json({
      msj: 'Ubication',
      ubicationList
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUbicationByPk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ubication = await Ubication.findByPk(id);

    res.json({
      msj: 'Ubication',
      ubication
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const getUbicationByName = async (req: Request, res: Response) => {
  const { city } = req.params;
  try {
    const ubication = await Ubication.findOne({ where: { city } });

    res.json({
      msj: 'Ubication',
      ubication
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const createUbication = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // Build new ubication
    const newUbication = await Ubication.build(body);
    const user = await User.findByPk(body.userId);

    if (user) {
      const updatedUserBody = {
        ...user?.dataValues,
        ubicationId: newUbication.dataValues.id
      };
      await User.update(updatedUserBody, { where: { id: body.userId } });
    }

    // Save the new ubication
    await newUbication.save();

    // Response
    res.json({
      msg: 'Ubication created',
      newUbication
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};
