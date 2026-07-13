import Job from '@/types/job'

type JobCardProps = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;

export const JobCard = ({ title, company, status, appliedAt }: JobCardProps) => {
  const date = new Date(appliedAt);
  return (
    <div>
      <h3>{title} - {company}</h3>
      <p>Status: {status}</p>
      <p>Applied At: {new Intl.DateTimeFormat('pt-BR').format(date)}</p>
    </div>
  )
}
