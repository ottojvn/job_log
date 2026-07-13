import { JobCard } from '@/components/JobCard'
import { getAll } from '@/services/api'

export default async function Home() {
  const jobs = await getAll()

  return (
    <div>
      <h1>Job Application Tracker</h1>
      <h2>All Job Applications</h2>
      {
        jobs.map((job) =>
          <JobCard
            key={job.id}
            title={job.title}
            company={job.company}
            status={job.status}
            appliedAt={job.appliedAt} />
        )
      }
    </div>
  )
}
