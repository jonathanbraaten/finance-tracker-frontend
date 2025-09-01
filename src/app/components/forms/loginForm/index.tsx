'use client';

import createInput from '../components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from 'app/components/forms/schemas';
import { API_URL } from 'lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  async function onSubmit(data: LoginSchema) {
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await fetch(`${API_URL}/accounts/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const results = await response.json();
      if (!response.ok) {
        throw new Error(results.message ?? 'Unexpected error');
      }

      setError('');
      router.replace('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred');
      }
    }
  }

  return (
    <form
      className="flex flex-col gap-1  max-w-xs w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {createInput(register, 'email', 'Email', errors)}
      {createInput(register, 'password', 'Password', errors)}
      <button
        className="bg-black text-white rounded-md my-3 py-1"
        type="submit"
      >
        Submit
      </button>
      <label className="min-h-[2vh] px-1" htmlFor={`error-${error}`}>
        {error && <p className="text-red-600 text-xs">{error}</p>}
      </label>
    </form>
  );
}
