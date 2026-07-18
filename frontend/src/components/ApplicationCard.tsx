import Application from '@/types/application'

type ApplicationCardProps = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

export const ApplicationCard = ({ title, company, status, appliedAt }: ApplicationCardProps) => {
  const date = new Date(appliedAt);
  return (
    <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition">
      <div className="flex flex-col mb-2 sm:mb-0">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          {title} <span className="font-normal text-neutral-500">
            {company}</span>
        </h3>
        <p className="text-sm text-neutral-400 mt-1">
          Aplicado em: {new Intl.DateTimeFormat('pt-BR').format(date)}
        </p>
      </div>

      <div className="flex items-center">
        <span
          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
          {status}
        </span>
      </div>
    </div>
  )
}
