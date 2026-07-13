import express from 'express';
import cors from 'cors';
import { jobRoutes } from './routes/job.routes.js'

const server = express();

server.use(cors());
server.use(express.json());
server.use(jobRoutes);

const port = 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
