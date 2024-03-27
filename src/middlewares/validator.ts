import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UUIDVersion } from 'express-validator/src/options';
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

// export const isOperationExistByPk = async (id: UUIDVersion) => {
//   const operation = await Operations.findByPk(id)

//   if (!operation) {
//     throw new Error(`The operation with id: ${id} doesn't exist`);
//   }
// }

// export const validateOperationType = async (operationType: String) => {
//   const foundedType = await Type.findOne({ where: { type: operationType } })

//   if (!foundedType) {
//     throw new Error(`The operation type is not valid. The type ${operationType} was not found`)
//   }
// }

// export const validateReason = async (reasonToFind: String) => {
//   const reasonFound = await Reason.findOne({ where: { name: reasonToFind } })

//   if (!reasonFound) {
//     throw new Error(`The operation type is not valid. The type ${reasonToFind} was not found`)
//   }
// }
