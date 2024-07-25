export type {
  Control,
  FieldError,
  ErrorOption,
  FieldValues,
  UseFormWatch,
  UseFormReturn,
  UseFormRegister,
  UseFormSetError,
  UseFormGetValues,
  UseFormClearErrors,
} from 'react-hook-form';

import {
  useForm as _useForm,
  useWatch as _useWatch,
  useController as _useController,
  useFieldArray as _useFieldArray,
} from 'react-hook-form';

/**
 * @deprecated since version 1.0
 * @remarks use createForm returned by createInstance instead.
 */
export const useForm = (...params: Parameters<typeof _useForm>) => {
  console.warn(
    'useForm is deprecated. Use createForm returned by createInstance instead.'
  );
  return _useForm(...params);
};

/**
 * @deprecated since version 1.0
 * @remarks use useWatch returned by createForm instead.
 */
export const useWatch = (...params: Parameters<typeof _useWatch>) => {
  console.warn(
    'Imported useWatch is deprecated. Use useWatch returned by createForm instead.'
  );
  return _useWatch(...params);
};

/**
 * @deprecated since version 1.0
 * @remarks use useController returned by createForm instead.
 */
export const useController = (...params: Parameters<typeof _useController>) => {
  console.warn(
    'Imported useController is deprecated. Use useController returned by createForm instead.'
  );
  return _useController(...params);
};

/**
 * @deprecated since version 1.0
 * @remarks use useFieldArray returned by createForm instead.
 */
export const useFieldArray = (...params: Parameters<typeof _useFieldArray>) => {
  console.warn(
    'Imported useFieldArray is deprecated. Use useFieldArray returned by createForm instead.'
  );
  return _useFieldArray(...params);
};

export { zodResolver } from '@hookform/resolvers/zod';

export { default as createForm } from './createForm';
export { default as createGeekFormInstance } from './createGeekFormInstance';
