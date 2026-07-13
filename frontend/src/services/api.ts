import Job from '@/types/job'

const baseUrl = process.env.API_URL

export const getAll = async (): Promise<Job[]> => {
  const res = await fetch(`${baseUrl}/jobs`)

  if (!res.ok) {
    throw new Error('GET /jobs failure')
  }

  return res.json()
}

export const getById = async (id: string): Promise<Job> => {
  const res = await fetch(`${baseUrl}/jobs/${id}`)

  if (!res.ok) {
    throw new Error(`GET /jobs/${id} failure`)
  }

  return res.json()
}
