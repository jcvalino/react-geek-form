import type {
  Control,
  FieldPath,
  FieldError,
  ErrorOption,
  FieldValues,
  UseFormWatch,
  UseFormReturn,
  FieldArrayPath,
  FieldPathValue,
  FieldPathValues,
  UseFormRegister,
  UseFormSetError,
  UseFormGetValues,
  UseFormClearErrors,
  UseControllerProps,
  UseControllerReturn,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  DeepPartialSkipArrayKey,
} from 'react-hook-form';

import {
  useForm as _useForm,
  useWatch as _useWatch,
  useController as _useController,
  useFieldArray as _useFieldArray,
} from 'react-hook-form';

export type {
  Control,
  FieldPath,
  FieldError,
  ErrorOption,
  FieldValues,
  UseFormWatch,
  UseFormReturn,
  FieldArrayPath,
  FieldPathValue,
  FieldPathValues,
  UseFormRegister,
  UseFormSetError,
  UseFormGetValues,
  UseFormClearErrors,
  UseControllerProps,
  UseControllerReturn,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  DeepPartialSkipArrayKey,
};

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

function _useWatch_<TFieldValues extends FieldValues = FieldValues>(props: {
  defaultValue?: DeepPartialSkipArrayKey<TFieldValues>;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  exact?: boolean;
}): DeepPartialSkipArrayKey<TFieldValues>;

function _useWatch_<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: {
  name: TFieldName;
  defaultValue?: FieldPathValue<TFieldValues, TFieldName>;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  exact?: boolean;
}): FieldPathValue<TFieldValues, TFieldName>;

function _useWatch_<
  TFieldValues extends FieldValues = FieldValues,
  TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[]
>(props: {
  name: readonly [...TFieldNames];
  defaultValue?: DeepPartialSkipArrayKey<TFieldValues>;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  exact?: boolean;
}): FieldPathValues<TFieldValues, TFieldNames>;

function _useWatch_(props: any) {
  console.warn(
    'Imported useWatch is deprecated. Use useWatch returned by createForm instead.'
  );
  return _useWatch(props);
}

/**
 * @deprecated since version 1.0
 * @remarks use useWatch returned by createForm instead.
 */
export const useWatch = _useWatch_;

/**
 * @deprecated since version 1.0
 * @remarks use useController returned by createForm instead.
 */
export const useController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName>
): UseControllerReturn<TFieldValues, TName> => {
  console.warn(
    'Imported useController is deprecated. Use useController returned by createForm instead.'
  );
  return _useController(props);
};

/**
 * @deprecated since version 1.0
 * @remarks use useFieldArray returned by createForm instead.
 */
export const useFieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id'
>(
  props: UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>
): UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName> => {
  console.warn(
    'Imported useFieldArray is deprecated. Use useFieldArray returned by createForm instead.'
  );
  return _useFieldArray(props);
};

export { zodResolver } from '@hookform/resolvers/zod';

export { default as createForm } from './createForm';
export { default as createGeekFormInstance } from './createGeekFormInstance';
