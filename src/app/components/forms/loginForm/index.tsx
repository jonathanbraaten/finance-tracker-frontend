'use client';
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from 'app/components/forms/schemas';
import { useEffect } from 'react';

type InputFields = keyof LoginSchema;

export default function LoginForm() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  function onSubmit(data: LoginSchema) {
    console.log(data);
    console.log(errors);
  }

  useEffect(() => console.log(errors), [errors]);
  const createInput = (
    reg: UseFormRegister<LoginSchema>,
    name: InputFields,
    label: string,
    errs: FieldErrors<LoginSchema>,
  ) => {
    const errMsg = errs[name]?.message as string | undefined;
    return (
      <div className="flex flex-col gap-1">
        <label className="sr-only absolute inset-o" htmlFor={name}>
          {label}
        </label>
        <input
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
  };

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
        submit
      </button>
    </form>
  );
}
