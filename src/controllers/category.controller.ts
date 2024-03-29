import { Request, Response } from "express";
import Category from '../models/category.model';
import User from '../models/user.models';

export const testCategory = async (_req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server' + Date.now().toLocaleString());
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const comments = await Category.findAll();
    res.json({
      msj: 'Categories',
      comments
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCategorieByPk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Category.findByPk(id);

    res.json({
      msj: 'Category',
      comment
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    // Build new user
    const category = await Category.build(body);

    // // Save the new user
    await category.save();

    // Response
    res.json({
      msg: 'createCategory',
      category
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const asignCategoryToProfesional = async (req: Request, res: Response) => {
  const { profesionalId, categoryId } = req.params;

  try {
    const profesional = await User.findByPk(profesionalId);

    if (profesional?.dataValues.rol !== 'PROFESIONAL') {
      throw new Error(`Only the profesionals can select a profesion category.`);
    }

    await profesional.update({ ...profesional, profesionalCategory: categoryId }, { where: { id: profesionalId } });

    // Response
    res.json({
      msg: 'Category asigned',
      profesional
    });

  } catch (error) {

  }

};
