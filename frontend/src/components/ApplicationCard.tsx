import Application from '@/types/application'

type ApplicationCardProps = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

export const ApplicationCard = ({ title, company, status, appliedAt }: ApplicationCardProps) => {
  const date = new Date(appliedAt);
  return (
    <div>
      <h3>{title} - {company}</h3>
      <p>Status: {status}</p>
      <p>Applied At: {new Intl.DateTimeFormat('pt-BR').format(date)}</p>
    </div>
  )
}
