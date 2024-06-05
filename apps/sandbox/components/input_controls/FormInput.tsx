import { useMemo } from 'react';
import { type IconType } from 'react-icons';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { type UseFormRegister, type ErrorOption } from 'react-geek-form';

import { cn } from '@/utilities';

type Props = {
  name: string;
  testId?: string;
  icon?: IconType;
  register: UseFormRegister<any>;
  label: string;
  error?: ErrorOption;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  placeholder?: string;
  optional?: boolean;
  errorDescription?: string;
  onChange?: (value: string) => void;
};

function FormInput({
  name,
  register,
  label,
  error,
  icon: Icon,
  optional = false,
  disabled = false,
  readOnly = false,
  testId = undefined,
  maxLength = undefined,
  placeholder = undefined,
  errorDescription = undefined,
  onChange,
}: Props) {
  const hasIcon = useMemo(() => Boolean(Icon), [Icon]);
  const { onChange: registerChange, ...registerRest } = register(name);
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

export default FormInput;
