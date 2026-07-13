import { Request, Response } from 'express'
import * as JobService from '../services/job.service.js'

export const createJob = async (req: Request, res: Response) => {
  const { title, company, status, appliedAt } = req.body;
  const job = await JobService.createJob({ title, company, status, appliedAt: new Date(appliedAt) })
  return res.status(201).json(job)
}

export const getJobs = async (_req: Request, res: Response) => {
  const jobs = await JobService.getJobs()
  return res.status(200).json(jobs)
}

export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const job = await JobService.getJobById(id)
  if (!job) {
    return res.status(204).json({ error: "Job ID not found" })
  }
  return res.status(200).json(job)
}

export const updateJob = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { title, company, status, appliedAt } = req.body;
  const job = await JobService.updateJob(id, { title, company, status, appliedAt: new Date(appliedAt) })

  if (!job) {
    return res.status(204).json({ error: "Job ID not found" })
  }
  return res.status(200).json(job)
}

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const job = await JobService.deleteJob(id)
  return res.status(200).json(job)
}
