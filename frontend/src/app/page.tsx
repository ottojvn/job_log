import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationForm } from '@/components/ApplicationForm';
import { getAll } from '@/services/api';

export default async function Home() {
  const applications = await getAll();

  return (
    <div>
      <h1>Job Tracker</h1>
      <h2>Log New Application</h2>
      <ApplicationForm />
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
