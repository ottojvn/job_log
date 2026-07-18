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
      <form action={handleSubmit} ref={formRef}>
        <label htmlFor='application-title'>Title</label>
        <input type='text' name='title' id='application-title' />
        <label htmlFor='application-company'>Company</label>
        <input type='text' name='company' id='application-company' />
        <label htmlFor='application-status'>Status</label>
        <select name='status' id='application-status'>
          <option value='applied'>Applied</option>
          <option value='interview'>Interview</option>
          <option value='denied'>Denied</option>
          <option value='accepted'>Accepted</option>
        </select>
        <label htmlFor='application-appliedAt'>Applied At</label>
        <input type='date' name='appliedAt' id='application-appliedAt' />
        <button type='submit'>Log</button>
      </form>
    </div>
  )
}
