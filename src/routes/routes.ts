import express, { Application } from 'express';
import userService from './users.router';

const app: Application = express();

app.use('/users', userService);

export default app;
