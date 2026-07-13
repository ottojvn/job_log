import { prisma } from '../config/prisma.js';

interface JobInput {
  title: string;
  company: string;
  status: string;
  appliedAt: Date;
}

export const createJob = async (data: JobInput) => {
  const job = await prisma.job.create({
    data: {
      title: data.title,
      company: data.company,
      status: data.status,
      appliedAt: data.appliedAt
    }
  });

  return job;
}

export const getJobs = async () => await prisma.job.findMany();

export const getJobById = async (id: string) => await prisma.job.findUnique({
  where: {
    id
  }
})

export const updateJob = async (id: string, data: JobInput) => await prisma.job.update({
  where: { id },
  data: data
})

export const deleteJob = async (id: string) => await prisma.job.delete({
  where: {
    id
  }
})
