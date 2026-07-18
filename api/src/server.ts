import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { applicationRoutes } from './routes/application.routes.js'

const server = express();

server.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

server.use(express.json());

const API_KEY = process.env.API_KEY as string;
server.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

server.use(applicationRoutes);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
