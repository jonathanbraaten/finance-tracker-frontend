'use client';

import createInput from '../components';

/**
 * Hook form imports.
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Zod schema imports.
 */
import { registerSchema, RegisterSchema } from 'app/components/forms/schemas';

/**
 * Base url.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL_PUBLIC } from 'lib/env';

import Link from 'next/link';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');

  /**
   * Hook form.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  /**
   * Submit handler.
   */
  async function onSubmit(data: RegisterSchema) {
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await fetch(`${API_URL_PUBLIC}/accounts/signup`, {
        method: 'POST',
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
      router.replace('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred');
      }
    }
  }

  return (
    <section className=" max-w-xs w-full">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        {createInput(register, 'first_name', 'First name', errors)}
        {createInput(register, 'last_name', 'Last name', errors)}
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
      <Link className="flex gap-1 text-xs" href={'/login'}>
        <span> Already have an account?</span>
        <span className="text-blue-500 underline">Log in</span>
      </Link>
    </section>
  );
}
