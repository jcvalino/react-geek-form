import { useMemo } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

import { cn } from '../utilities';
// import Text from '../informationals/Text';
// import Stack from './Stack';

export type FieldError =
  | {
      message: string;
    }
  | string;

export type Props = {
  id?: string;
  name?: string;
  error?: FieldError;
  className?: string;
  readOnly?: boolean;
} & (
  | {
      inline: true;
      label?: never;
      optional?: never;
      helpText?: never;
    }
  | {
      inline?: false;
      label?: string;
      optional?: boolean;
      helpText?: string;
    }
);

const FieldWrapper = ({
  id,
  name,
  error,
  children,
  readOnly,
  className,
  ...rest
}: Props & {
  children: React.ReactNode;
}) => {
  const { inline, label, helpText, optional } = useMemo(() => {
    if (rest.inline)
      return {
        ...rest,
        label: undefined,
        optional: undefined,
        helpText: undefined,
      };
    return { ...rest, inline: false };
  }, [rest]);
  return (
    <div className={cn('flex-grow items-start', className)}>
      {(label || optional) && !inline && (
        <div className="space-y-1">
          <p className="w-full text-nowrap text-subtle">{label}</p>

          {optional && !readOnly ? (
            <p className="w-fit text-nowrap italic text-subtle">- optional</p>
          ) : null}
        </div>
      )}

      {children}

      {!inline &&
        (error ? (
          <div
            className={cn(
              'min-h-[1rem] text-danger',
              ((!error && !helpText) || readOnly) && 'invisible',
            )}
          >
            <BiErrorCircle className="text-caption" />
            <p>{typeof error === 'object' ? error?.message : error}</p>
          </div>
        ) : (
          <p
            className={cn(
              'min-h-[1rem] text-subtle',
              ((!error && !helpText) || readOnly) && 'invisible',
            )}
          >
            {helpText}
          </p>
        ))}
    </div>
  );
};

export default FieldWrapper;
