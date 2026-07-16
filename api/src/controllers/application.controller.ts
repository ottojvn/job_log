import { Request, Response } from 'express';
import * as ApplicationService from '../services/application.service.js';
import { Prisma } from '../generated/prisma/client.js';

export const createApplication = async (req: Request, res: Response) => {
  const { title, company, status, appliedAt } = req.body;
  try {
    const application = await ApplicationService.createApplication({ title, company, status, appliedAt: new Date(appliedAt) });
    return res.status(201).json(application);
  } catch (error) {
    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getApplications = async (_req: Request, res: Response) => {
  try {
    const applications = await ApplicationService.getApplications();
    return res.status(200).json(applications);
  } catch (error) {
    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getApplicationById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const application = await ApplicationService.getApplicationById(id);
    if (!application) {
      return res.status(404).json({ error: "Application ID not found" });
    }
    return res.status(200).json(application);
  } catch (error) {
    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const updateApplication = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { title, company, status, appliedAt } = req.body;
  try {
    const application = await ApplicationService.updateApplication(id, { title, company, status, appliedAt: new Date(appliedAt) })
    if (!application) {
      return res.status(404).json({ error: "Application ID not found" });
    }
    return res.status(200).json(application)
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Application ID not found' });
      }
    }
    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const deleteApplication = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const application = await ApplicationService.deleteApplication(id)
    return res.status(200).json(application)
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Application ID not found' });
      }
    }
    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
