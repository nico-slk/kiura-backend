import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UUIDVersion } from 'express-validator/src/options';
import Category from '../models/category.model';
import Comment from '../models/comments.model';
import Ubication from '../models/ubication.models';
import User from '../models/user.models';

export const validator = (req: Request, res: Response, next: NextFunction): any => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

export const emailExist = async (email: string | '') => {
  const exist = await User.findOne({ where: { email } });

  if (exist) {
    throw new Error(`El correo ${email} ya se encuentra registrado`);
  }
};

export const isUserExistByPk = async (id: UUIDVersion) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error(`The user with id: ${id} doesn't exist`);
  }

};

export const isUserProfesional = async (idProfesional: UUIDVersion) => {
  console.log(`profesional: ${idProfesional}`);

  const user = await User.findByPk(idProfesional);

  if (!user) {
    throw new Error(`The user with id: ${idProfesional} doesn't exist`);
  }

  if (user.getDataValue('rol') !== "PROFESIONAL") {
    throw new Error(`The user should be a profesional.`);
  }

};

export const isUbicationExistByPk = async (id: UUIDVersion) => {
  console.log(`profesional: ${id}`);
  const ubication = await Ubication.findByPk(id);

  if (!ubication) {
    throw new Error(`The ubication with id: ${id} doesn't exist`);
  }
};

export const isUbicationExistByName = async (city: string) => {
  const ubication = await Ubication.findOne({ where: { city } });

  if (ubication) {
    throw new Error(`The ubication with name: ${city} already exist`);
  }
};

export const isCommentExistByPk = async (param: string) => {
  const comment = await Comment.findByPk(param);

  if (!comment) {
    throw new Error(`The comment with ID: ${param} doesn't exist`);
  }
};

export const isCategoryExistByPk = async (param: string) => {
  const category = await Category.findByPk(param);

  if (!category) {
    throw new Error(`The category with ID: ${param} doesn't exist`);
  }
};
