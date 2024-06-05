import { useMemo, useState } from 'react';
import { type IconType } from 'react-icons';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { type UseFormRegister, type FieldError } from 'react-geek-form';

import { cn } from '@/utilities';

type Props = {
  name: string;
  testId?: string;
  register: UseFormRegister<any>;
  label: string;
  icon?: IconType;
  error?: FieldError;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  placeholder?: string;
  optional?: boolean;
  errorDescription?: string;
  onChange?: (value: string) => void;
};

function FormPassword({
  name,
  register,
  label,
  error,
  icon: Icon,
  disabled = false,
  optional = false,
  readOnly = false,
  testId = undefined,
  maxLength = undefined,
  placeholder = undefined,
  errorDescription = undefined,
  onChange,
}: Props) {
  const { onChange: registerChange, ...registerRest } = register(name);
  const [inputType, setInputType] = useState('password');

  const hasIcon = useMemo(() => Boolean(Icon), [Icon]);

  const toggleHideUnhidePassword = () => {
    if (inputType === 'password') setInputType('text');
    else setInputType('password');
  };

  return (
    <div className="flex flex-col items-start space-y-1">
      <label
        htmlFor={name}
        className="flex w-full justify-between text-xs font-medium leading-[0.875rem] text-subtle"
      >
        <span>{label}</span>
        {optional && !readOnly && (
          <span className="font-normal text-gray-500">Optional</span>
        )}
      </label>
      <div className="relative w-full">
        {Icon ? (
          <Icon
            className={cn(
              'absolute left-[0.625rem] top-1/2 h-[0.875rem] w-[0.875rem] -translate-y-1/2 text-subtle',
              disabled ? 'text-disabled' : '',
              error ? 'text-onDanger-subtle' : ''
            )}
          />
        ) : null}
        <input
          id={name}
          type={inputType}
          data-test-id={testId}
          {...registerRest}
          className={cn(
            'w-full rounded border bg-white p-[0.625rem] text-sm leading-4 placeholder:text-placeholder',
            'focus:outline-none disabled:bg-interface-disabled ',
            '[&:not(:disabled)]:read-only:border-none [&:not(:disabled)]:read-only:bg-white [&:not(:disabled)]:read-only:px-0 [&:not(:disabled)]:read-only:pt-1.5 ',
            hasIcon ? 'pl-[1.6rem]' : '',
            error
              ? 'border-danger-subtle bg-danger-subtle text-onDanger-subtle'
              : 'focus:border-selected'
          )}
          onChange={(e) => {
            const { value } = e.target;
            registerChange(e);
            if (typeof onChange === 'function') onChange(value);
          }}
          placeholder={readOnly ? '-' : placeholder}
          disabled={readOnly ? false : disabled}
          readOnly={readOnly}
          maxLength={maxLength}
        />
        <button
          tabIndex={-1}
          type="button"
          className={cn(
            'absolute right-[0.625rem] top-1/2 -translate-y-1/2',
            error
              ? 'text-onDanger-subtle'
              : 'text-subtle hover:text-onBrand-subtle'
          )}
          onClick={toggleHideUnhidePassword}
        >
          {inputType === 'password' ? (
            <AiFillEyeInvisible className="h-[0.875rem] w-[0.875rem]" />
          ) : (
            <AiFillEye className="h-[0.875rem] w-[0.875rem]" />
          )}
        </button>
      </div>
      <small
        className={cn(
          '!mt-0.5 flex min-h-[1rem] items-center space-x-1 text-xs',
          !error && !errorDescription ? 'invisible' : '',
          error ? 'text-onDanger-subtle' : ''
        )}
      >
        {error ? (
          <>
            <HiOutlineExclamationCircle /> <span>{error?.message}</span>
          </>
        ) : (
          errorDescription
        )}
      </small>
    </div>
  );
}

export default FormPassword;
