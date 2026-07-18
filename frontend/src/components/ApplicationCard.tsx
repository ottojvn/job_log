'use client';

import Application from '@/types/application';
import { useRouter } from 'next/navigation';
import { remove, update } from '@/services/api';

type ApplicationCardProps = Omit<Application, 'createdAt' | 'updatedAt'>;

export const ApplicationCard = ({ id, title, company, status, appliedAt }: ApplicationCardProps) => {
  const router = useRouter();
  const date = new Date(appliedAt);

  const handleDelete = async () => {
    await remove(id);
    router.refresh();
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await update(id, { title, company, appliedAt, status: e.target.value });
    router.refresh();
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition">
      <div className="flex flex-col mb-2 sm:mb-0">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          {title} - {company}
        </h3>
        <select
          name='status'
          id='application-status'
          className='w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition'
          value={status} onChange={handleStatusChange}>
          <option value='applied'>Applied</option>
          <option value='interview'>Interview</option>
          <option value='denied'>Denied</option>
          <option value='accepted'>Accepted</option>
        </select>
        <div className='flex gap-2'>
          <button onClick={handleDelete} className='text-red-500 font-bold'>Delete</button>
        </div>
        <p className="text-sm text-neutral-400 mt-1">
          Aplicado em: {new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date)}
        </p>
      </div >
    </div >
  );
}
