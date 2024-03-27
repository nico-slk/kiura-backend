import { ErrorRequestHandler } from 'express';

export const errorLog: ErrorRequestHandler = (err, _req, _res, next) => {
  console.log('errorLog');
  next(err);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
};
