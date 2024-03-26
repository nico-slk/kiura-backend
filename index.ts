import express, { Application, Request, Response } from 'express';
import routes from './src/routes/routes';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);


app.get('/test', (_req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server' + Date.now().toLocaleString());
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
