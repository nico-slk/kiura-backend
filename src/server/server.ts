import cors from 'cors';
import express, { Application } from 'express';
// import '../models/operations.js';
// import '../models/reason.js';
import '../models/user.models';
import userRouter from '../routes/users.router.js';

import { db } from '../db/connection';

class Server {

  private app: Application;
  private port: string;
  private apiPath = {
    operation: '/api/operation',
    user: '/api/user',
    login: '/api/login',
    reason: '/api/reason',
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
    // this.app.use(this.apiPath.login, loginRouter);
    // this.app.use(this.apiPath.operation, operationRouter);
    // this.app.use(this.apiPath.reason, reasonRouter);
  }

  async dbConection() {
    try {
      await db.sync();
      await db.authenticate();
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
