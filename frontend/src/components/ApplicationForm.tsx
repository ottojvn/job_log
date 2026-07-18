'use client';

import { create } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export const ApplicationForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const applicationData = {
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      status: formData.get('status') as string,
      appliedAt: formData.get('appliedAt') as string
    };

    try {
      await create(applicationData);
      router.refresh();
      formRef.current?.reset();
      alert('Application logged');
    } catch (error) {
      console.error('Error logging application:', error);
      alert('Failed to log application');
    }
  }

  return (
    <div>
      <form
        action={handleSubmit}
        ref={formRef}
        className='bg-white dark:bg-neutral-900 shadow-md rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='application-title'
            className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>Title</label>
          <input
            type='text'
            name='title'
            id='application-title'
            className='w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition' />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='application-company'
            className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>Company</label>
          <input
            type='text'
            name='company'
            id='application-company'
            className='w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition' />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='application-status'
            className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>Status</label>
          <select
            name='status'
            id='application-status'
            className='w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition' >
            <option value='applied'>Applied</option>
            <option value='interview'>Interview</option>
            <option value='denied'>Denied</option>
            <option value='accepted'>Accepted</option>
          </select>
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='application-appliedAt'
            className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>Applied At</label>
          <input
            type='date'
            name='appliedAt'
            id='application-appliedAt'
            className='w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition' />
        </div>
        <button
          type='submit'
          className='mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors'
        >Log</button>
      </form >
    </div >
  )
}
