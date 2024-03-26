import express, { Application } from 'express';
import userService from '../services/usersService';

const app: Application = express();

app.use('/users', userService);

export default app;
