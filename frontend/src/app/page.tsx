import { ApplicationCard } from '@/components/ApplicationCard'
import { getAll } from '@/services/api'

export default async function Home() {
  const applications = await getAll()

  return (
    <div>
      <h1>Job Tracker</h1>
      <h2>All Applications</h2>
      {
        applications.map((application) =>
          <ApplicationCard
            key={application.id}
            title={application.title}
            company={application.company}
            status={application.status}
            appliedAt={application.appliedAt} />
        )
      }
    </div>
  )
}
