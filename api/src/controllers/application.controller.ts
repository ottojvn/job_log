import { Request, Response } from 'express';
import * as ApplicationService from '../services/application.service.js';
import { Prisma } from '../generated/prisma/client.js';

const API_KEY = process.env.API_KEY;

const getSecureUser = (req: Request) => {
  const apiKey = req.headers['x-api-key'];
  if (!API_KEY || apiKey !== API_KEY) {
    throw new Error('Unauthorized');
  }
  return req.headers['x-user-id'] as string;
}


export const createApplication = async (req: Request, res: Response) => {
  const { title, company, status, appliedAt } = req.body;
  try {
    const userId = getSecureUser(req);
    const application = await ApplicationService.createApplication({ userId, title, company, status, appliedAt: new Date(appliedAt) });
    return res.status(201).json(application);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getApplications = async (req: Request, res: Response) => {
  try {
    const userId = getSecureUser(req);
    const applications = await ApplicationService.getApplications(userId);
    return res.status(200).json(applications);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getApplicationById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const userId = getSecureUser(req);
    const application = await ApplicationService.getApplicationById(id, userId);
    if (!application) {
      return res.status(404).json({ error: "Application ID not found" });
    }
    return res.status(200).json(application);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const updateApplication = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { title, company, status, appliedAt } = req.body;
  try {
    const userId = getSecureUser(req);
    const application = await ApplicationService.updateApplication(id, userId, { userId, title, company, status, appliedAt: new Date(appliedAt) })
    if (!application) {
      return res.status(404).json({ error: "Application ID not found" });
    }
    return res.status(200).json(application)
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Application ID not found' });
      }
    }

    if (error.message === 'Unauthorized') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const deleteApplication = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const userId = getSecureUser(req);
    const application = await ApplicationService.deleteApplication(id, userId)
    return res.status(200).json(application)
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Application ID not found' });
      }
    }

    if (error.message === 'Unauthorized') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.error('Internal error: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
