import cors from 'cors';
import express, { Application } from 'express';
import '../models/association';
import '../models/ubication.models';
import '../models/user.models';
import ubicationRouter from '../routes/ubication.router';
import userRouter from '../routes/users.router.js';

import { db } from '../db/connection';

class Server {

  private app: Application;
  private port: string;
  private apiPath = {
    ubication: '/api/ubication',
    user: '/api/user',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8090';
    this.middlware();
    this.routes();
    this.dbConection();
  }

  middlware() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));

  }

  routes() {
    this.app.use(this.apiPath.user, userRouter);
    this.app.use(this.apiPath.ubication, ubicationRouter);
  }

  async dbConection() {
    try {
      // await db.sync({ force: true });
      await db.sync({ alter: true });
      // await db.sync();
      await db.authenticate();
      console.log('Connected to DB');

    } catch (error: any) {
      throw new Error(error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port: ${this.port}`);

    });
  }

}

export default Server;
