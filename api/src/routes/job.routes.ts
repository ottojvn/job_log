import { Router } from 'express';
import * as JobController from '../controllers/job.controller.js';

const jobRoutes = Router();

jobRoutes.post('/jobs', JobController.createJob);
jobRoutes.get('/jobs', JobController.getJobs);
jobRoutes.get('/jobs/:id', JobController.getJobById);
jobRoutes.patch('/jobs/:id', JobController.updateJob);
jobRoutes.delete('/jobs/:id', JobController.deleteJob);

export { jobRoutes };
