import type {
  FieldValues,
  UseFormRegister,
  Control as Ctrl,
  FieldError as FldErr,
} from 'react-hook-form';

export { useController } from 'react-hook-form';
export { default as createForm } from './createForm';
export { default as createGeekFormInstance } from './createGeekFormInstance';

export type Register<TFieldValues extends FieldValues> =
  UseFormRegister<TFieldValues>;

export type Control<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = Ctrl<TFieldValues, TContext>;

export type FieldError = FldErr;
