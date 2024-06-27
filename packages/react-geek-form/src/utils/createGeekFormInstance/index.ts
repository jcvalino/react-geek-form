import { z } from 'zod';
import {
  Control,
  FieldError,
  UseFormRegister,
  type FieldPath,
} from 'react-hook-form';

import createForm from '../createForm';
import React from 'react';

type ContextInjectedFieldPropKey = 'register' | 'control' | 'error';

type MandatoryFieldProps = {
  name: string;
  error?: FieldError;
} & (
  | {
      register: UseFormRegister<any>;
    }
  | {
      control: Control<any>;
    }
);

const createGeekFormInstance = <
  TFormFieldName extends string,
  TWrappedFormFields extends {
    name: TFormFieldName;
    component: {
      (props: any): Parameters<
        TWrappedFormFields[number]['component']
      >[0] extends MandatoryFieldProps
        ? JSX.Element
        : never;
    };
  }[]
>({
  fieldComponents,
}: {
  fieldComponents: TWrappedFormFields;
}) => {
  const cF = <TSchema extends z.ZodObject<any> | z.ZodEffects<any>>({
    zodSchema,
  }: {
    zodSchema: TSchema;
  }) => {
    type InferedSchema = z.infer<TSchema>;
    const form = createForm({ zodSchema });

    const registeredFields = fieldComponents.reduce<{
      [FormField in TWrappedFormFields[number] as FormField extends any
        ? FormField['name']
        : never]: <TNoStrict extends boolean = false>(
        props: {
          [K in keyof Omit<
            React.ComponentPropsWithoutRef<FormField['component']>,
            ContextInjectedFieldPropKey
          >]: K extends 'name'
            ? TNoStrict extends false
              ? FieldPath<InferedSchema>
              : string
            : Omit<
                React.ComponentPropsWithoutRef<FormField['component']>,
                ContextInjectedFieldPropKey
              >[K];
        } & {
          noStrict?: TNoStrict;
        }
      ) => JSX.Element;
    }>((fields, field) => {
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

export default createGeekFormInstance;