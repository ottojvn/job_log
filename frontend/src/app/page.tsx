import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationForm } from '@/components/ApplicationForm';
import { getAll } from '@/services/api';

export default async function Home() {
  const applications = await getAll();

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Job Tracker</h1>
      <h2 className="text-2xl font-bold mt-10 mb-4">Log New Application</h2>
      <ApplicationForm />
      <h2 className="text-2xl font-bold mt-10 mb-4">All Applications</h2>
      <div className="flex flex-col gap-4">
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
    </main>
  )
}
