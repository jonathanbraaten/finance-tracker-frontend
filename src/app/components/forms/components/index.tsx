import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { LoginSchema, RegisterSchema } from '../schemas';
/**
 * Schema type.
 */
type InputFields = keyof RegisterSchema | keyof LoginSchema;

export default function createInput<T extends FieldValues>(
  reg: UseFormRegister<T>,
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
        {...reg(name as unknown as import('react-hook-form').Path<T>)}
      />
      <label className="min-h-[2vh] px-1" htmlFor={`error-${errMsg}`}>
        {errMsg && <p className="text-red-600 text-xs">{errMsg}</p>}
      </label>
    </div>
  );
}
