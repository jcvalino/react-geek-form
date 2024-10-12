import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { cn } from './../utilities';

type FieldError = {
  message: string;
};

type Props = {
  name?: string;
  label?: string;
  error?: FieldError;
  readOnly?: boolean;
  optional?: boolean;
  children: React.ReactNode;
  errorDescription?: string;
  noError?: boolean;
};

const FormFieldWrapper = ({
  label,
  name,
  error,
  children,
  readOnly,
  optional,
  noError,
  errorDescription,
}: Props) => {
  return (
    <div className="flex flex-col items-start space-y-1">
      {(label || optional) && (
        <label
          htmlFor={name}
          className="flex w-full justify-between text-xs font-medium leading-[0.875rem] text-subtle"
        >
          <span>{label}</span>
          {optional && (
            <span className="font-normal text-gray-500">Optional</span>
          )}
        </label>
      )}
      {children}
      {!noError && (
        <small
          className={cn(
            '!mt-0.5 flex min-h-[1rem] items-center space-x-1 text-xs',
            (!error && !errorDescription) || readOnly ? 'invisible' : '',
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
      )}
    </div>
  );
};

export default FormFieldWrapper;
