// Permitir a los usuarios registrarse proporcionando información básica como nombre, correo electrónico, etc.

import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('All users');
});

router.get('/:userid', (req: Request, res: Response) => {
  res.send(`User with ID: ${req.params.userid}`);
});

router.post('/new', (req: Request, res: Response) => {
  console.log(req.body);

  res.send(req.body);
});

export default router;
