import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { config } from '../config/config';

export const validateJwt = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['authorization'];

  if (!token) {
    res.status(403).json({
      msg: `There's no token available.`
    });
  }

  if (token && !token.startsWith('Bearer ')) {
    res.status(403).json({
      msg: `Token format is invalid.`
    });
  }

  try {

    jwt.verify(token!.slice(7), config.JWT as Secret, (error) => {
      if (error) {
        res.status(401).json({
          msg: 'Error at token verfication',
          error
        });
      }
    });

  } catch (error) {

    res.status(401).json({
      msg: 'Invalid token',
      error
    });

  }

  next();


};
