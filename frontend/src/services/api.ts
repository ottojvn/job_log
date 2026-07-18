'use server';

import { revalidatePath } from 'next/cache';
import Application from '@/types/application'
import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth/next";

const API_KEY = process.env.API_KEY as string;
const baseUrl = process.env.INTERNAL_API_URL;

export const getAll = async (): Promise<Application[]> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const res = await fetch(`${baseUrl}/applications`,
    {
      cache: 'no-store',
      headers: {
        'x-api-key': API_KEY,
        'x-user-id': String(userId)
      }
    });

  if (!res.ok) {
    throw new Error('GET /applications failure');
  }

  return res.json();
}

export const getById = async (id: string): Promise<Application> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const res = await fetch(`${baseUrl}/applications/${id}`,
    {
      cache: 'no-store',
      headers: {
        'x-api-key': API_KEY,
        'x-user-id': String(userId)
      }
    });

  if (!res.ok) {
    throw new Error(`GET /applications/${id} failure`)
  }

  return res.json()
}

type CreateApplicationInput = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

export const create = async (data: CreateApplicationInput): Promise<Application> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const res = await fetch(`${baseUrl}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'x-user-id': String(userId)
    },
    body: JSON.stringify({ ...data })
  })

  if (!res.ok) {
    throw new Error('POST /applications failure')
  }

  revalidatePath('/');
  return res.json()
}

export const remove = async (id: string): Promise<Application> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const res = await fetch(`${baseUrl}/applications/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': API_KEY,
      'x-user-id': String(userId)
    }
  })

  if (!res.ok) {
    throw new Error(`DELETE /applications/${id} failure`)
  }

  revalidatePath('/');
  return res.json();
}

export const update = async (id: string, data: Partial<CreateApplicationInput>): Promise<Application> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const res = await fetch(`${baseUrl}/applications/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'x-user-id': String(userId)
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error(`PATCH /applications/${id} failure`)
  }

  revalidatePath('/');
  return res.json()
}
