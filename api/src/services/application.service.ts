import { prisma } from '../config/prisma.js';

interface ApplicationInput {
  userId: string;
  title: string;
  company: string;
  status: string;
  appliedAt: Date;
}

export const createApplication = async (data: ApplicationInput) => {
  const application = await prisma.application.create({
    data: {
      userId: data.userId,
      title: data.title,
      company: data.company,
      status: data.status,
      appliedAt: data.appliedAt
    }
  });

  return application;
}

export const getApplications = async (userId: string) => await prisma.application.findMany({
  where: { userId }
});

export const getApplicationById = async (id: string, userId: string) => await prisma.application.findFirst({
  where: {
    id,
    userId
  }
})

export const updateApplication = async (id: string, userId: string, data: ApplicationInput) => {
  const existingApplication = await getApplicationById(id, userId);
  if (!existingApplication) throw new Error('Application not found or you do not have permission to update it.');

  return await prisma.application.update({
    where: { id },
    data: data
  })
}

export const deleteApplication = async (id: string, userId: string) => {
  const existingApplication = await getApplicationById(id, userId);
  if (!existingApplication) throw new Error('Application not found or you do not have permission to delete it.');
  return await prisma.application.delete({
    where: {
      id
    }
  })
}
