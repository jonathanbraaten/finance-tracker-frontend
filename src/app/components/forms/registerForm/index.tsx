'use client';
/**
 * Hook form imports.
 */
import { useForm, FieldErrors, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Zod schema imports.
 */
import { registerSchema, RegisterSchema } from 'app/components/forms/schemas';
/**
 * Schema type.
 */
type InputFields = keyof RegisterSchema;

/**
 * Base url.
 */
const url = process.env.NEXT_PUBLIC_API_URL ?? '';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    if (!data && errors) {
      return;
    }

    try {
      const response = await fetch(`${url}/accounts/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      setError('');
      router.replace('/login');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setError(error.message as string);
      } else {
        console.log('An unknown error occurred in catch');
      }
    }
  }

  return (
    <form
      className="flex flex-col gap-1  max-w-xs w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {createInput(register, 'first_name', 'First name', errors)}
      {createInput(register, 'last_name', 'Last name', errors)}
      {createInput(register, 'email', 'Email', errors)}
      {createInput(register, 'password', 'password', errors)}

      <button
        className="bg-black text-white rounded-md my-3 py-1"
        type="submit"
      >
        submit
      </button>
      <div className="text-xs min-h-[2vh]">
        <p className="text-red-600">{error && error}</p>
      </div>
    </form>
  );
}

/**
 * Create input fields.
 */
function createInput(
  reg: UseFormRegister<RegisterSchema>,
  name: InputFields,
  label: string,
  errs: FieldErrors<RegisterSchema>,
) {
  const errMsg = errs[name]?.message as string | undefined;
  return (
    <div className="flex flex-col gap-1">
      <label className="sr-only absolute inset-o" htmlFor={name}>
        {label}
      </label>
      <input
        type={name === 'password' ? 'password' : 'text'}
        className="border border-gray-200 rounded-md p-1 placeholder:px-1"
        placeholder={label}
        id={name}
        {...reg(name)}
      />
      <label className="min-h-[2vh] px-1" htmlFor={`error-${errMsg}`}>
        {errMsg && <p className="text-red-600 text-xs">{errMsg}</p>}
      </label>
    </div>
  );
}
