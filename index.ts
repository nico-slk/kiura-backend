import dotEnv from 'dotenv';
import Server from "./src/server/server";

dotEnv.config();

const server = new Server();

server.listen();
