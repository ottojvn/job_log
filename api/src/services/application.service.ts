import { prisma } from '../config/prisma.js';

interface ApplicationInput {
  title: string;
  company: string;
  status: string;
  appliedAt: Date;
}

export const createApplication = async (data: ApplicationInput) => {
  const application = await prisma.application.create({
    data: {
      title: data.title,
      company: data.company,
      status: data.status,
      appliedAt: data.appliedAt
    }
  });

  return application;
}

export const getApplications = async () => await prisma.application.findMany();

export const getApplicationById = async (id: string) => await prisma.application.findUnique({
  where: {
    id
  }
})

export const updateApplication = async (id: string, data: ApplicationInput) => await prisma.application.update({
  where: { id },
  data: data
})

export const deleteApplication = async (id: string) => await prisma.application.delete({
  where: {
    id
  }
})
