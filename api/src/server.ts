import express from 'express';
import cors from 'cors';
import { applicationRoutes } from './routes/application.routes.js'

const server = express();

server.use(cors());
server.use(express.json());
server.use(applicationRoutes);

const port = 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
