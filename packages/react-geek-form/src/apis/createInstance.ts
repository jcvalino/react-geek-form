import { z } from 'zod';
import { type FieldPath } from 'react-hook-form';
import React, { type ForwardRefExoticComponent } from 'react';

import type {
  UnionToArray,
  MakePropertyOptional,
  FindErrorFieldIndexes,
} from '../utils';
import createForm from './createForm';

type FormFieldComponent = (props: any) => JSX.Element;

const createInstance = <
  const TWrappedFormFields extends {
    [fieldName: string]: FormFieldComponent | ForwardRefExoticComponent<any>;
  },
  TWrappedFormFieldArray = UnionToArray<
    {
      [FieldName in keyof TWrappedFormFields]: {
        name: FieldName;
        component: TWrappedFormFields[FieldName];
      };
    }[keyof TWrappedFormFields]
  >,
  // @ts-expect-error
  TErrorFieldIndexes = FindErrorFieldIndexes<TWrappedFormFieldArray>
>(
  fieldComponents: TWrappedFormFields & {
    [K in keyof (TErrorFieldIndexes extends never
      ? { errorFields?: any }
      : { errorFields: any }) as K extends 'errorFields'
      ? K
      : never]: TErrorFieldIndexes extends number
      ? // @ts-expect-error
        TWrappedFormFieldArray[TErrorFieldIndexes]['name']
      : never;
  }
) => {
  const cF = <TSchema extends z.ZodObject<any> | z.ZodEffects<any>>({
    zodSchema,
  }: {
    zodSchema: TSchema;
  }) => {
    type InferedSchema = z.infer<TSchema>;
    const form = createForm({ zodSchema });
    type RegisteredFieldsEntries = {
      [FormFieldName in keyof TWrappedFormFields]: {
        name: FormFieldName;
        component: TWrappedFormFields[FormFieldName];
      };
    };

    type RegisteredFields = {
      [FormField in RegisteredFieldsEntries[keyof RegisteredFieldsEntries] as FormField extends any
        ? FormField['name']
        : never]: <
        TNoStrict extends boolean = false,
        OmittedProps = Omit<
          React.ComponentProps<FormField['component']>,
          'value' | 'error' | 'name'
        > & { name: string }
      >(
        props: MakePropertyOptional<
          {
            [K in keyof OmittedProps]: K extends 'name'
              ? TNoStrict extends false
                ? FieldPath<InferedSchema>
                : string
              : OmittedProps[K];
          },
          // @ts-expect-error
          'onChange'
        > & {
          noStrict?: TNoStrict;
        }
      ) => JSX.Element;
    };

    const registeredFields = Object.keys(fieldComponents)
      .map((fieldName) => ({
        name: fieldName,
        component: fieldComponents[fieldName],
      }))
      .reduce<RegisteredFields>((fields, field) => {
        // @ts-expect-error
        fields[field.name] = form.withFieldContext(field.component);
        return fields;
      }, {} as any);

    return {
      ...form,
      ...registeredFields,
    };
  };

  return {
    createForm: cF,
  };
};

export default createInstance;
