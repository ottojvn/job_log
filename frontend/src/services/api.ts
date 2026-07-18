import Application from '@/types/application'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const getAll = async (): Promise<Application[]> => {
  const res = await fetch(`${baseUrl}/applications`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('GET /applications failure')
  }

  return res.json()
}

export const getById = async (id: string): Promise<Application> => {
  const res = await fetch(`${baseUrl}/applications/${id}`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error(`GET /applications/${id} failure`)
  }

  return res.json()
}

type CreateApplicationInput = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

export const create = async (data: CreateApplicationInput): Promise<Application> => {
  const res = await fetch(`${baseUrl}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data })
  })

  if (!res.ok) {
    throw new Error('POST /applications failure')
  }

  return res.json()
}
