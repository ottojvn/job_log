import { Router } from 'express';
import * as ApplicationController from '../controllers/application.controller.js';

const applicationRoutes = Router();

applicationRoutes.post('/applications', ApplicationController.createApplication);
applicationRoutes.get('/applications', ApplicationController.getApplications);
applicationRoutes.get('/applications/:id', ApplicationController.getApplicationById);
applicationRoutes.patch('/applications/:id', ApplicationController.updateApplication);
applicationRoutes.delete('/applications/:id', ApplicationController.deleteApplication);

export { applicationRoutes };
