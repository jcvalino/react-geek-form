import type {
  Control,
  FieldPath,
  FieldError,
  ErrorOption,
  UseFormRegister,
} from 'react-hook-form';
import { z } from 'zod';
import React from 'react';

import createForm from '../createForm';

import { IsOneOfIndexesExtends, UnionToArray } from '../types';

type ContextInjectedFieldPropKey = 'register' | 'control' | 'error';

type MandatoryFieldProps = {
  name: string;
  error?: FieldError | ErrorOption;
} & (
  | {
      register: UseFormRegister<any>;
    }
  | {
      control: Control<any>; // Note: Fix this!
    }
);

type FormField = {
  name: any;
  component: (props: any) => JSX.Element;
};

type FindErrorFieldIndexes<
  TFormFields extends any[],
  TErrorFieldIndexes extends number = never
> = IsOneOfIndexesExtends<
  UnionToArray<
    TFormFields extends [...any, infer RField]
      ? RField extends FormField
        ? Parameters<RField['component']>[0]
        : never
      : never
  >,
  MandatoryFieldProps
> extends true
  ? TFormFields extends [...infer TFormFieldsFrontRest, any]
    ? FindErrorFieldIndexes<TFormFieldsFrontRest, TErrorFieldIndexes>
    : TErrorFieldIndexes
  : TFormFields extends [...infer TFormFieldsFrontRest, any]
  ? TFormFieldsFrontRest['length'] extends 0
    ? TErrorFieldIndexes | TFormFieldsFrontRest['length']
    : FindErrorFieldIndexes<
        TFormFieldsFrontRest,
        TErrorFieldIndexes | TFormFieldsFrontRest['length']
      >
  : never;

const createGeekFormInstance = <
  TFormFieldName extends string,
  const TWrappedFormFields extends {
    name: TFormFieldName;
    component: {
      (props: any): JSX.Element;
    };
  }[],
  TErrorFieldIndexes = FindErrorFieldIndexes<TWrappedFormFields>
>({
  fieldComponents,
}: {
  fieldComponents: TWrappedFormFields;
} & {
  [K in keyof (TErrorFieldIndexes extends never
    ? { errorFields?: any }
    : { errorFields: any }) as K extends 'errorFields'
    ? K
    : never]: TErrorFieldIndexes extends number
    ? TWrappedFormFields[TErrorFieldIndexes]['name']
    : never;
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

// type A = [
//   {
//     name: 'test0';
//     component: (props: {
//       name: string;
//       register: UseFormRegister<any>;
//     }) => JSX.Element;
//   },
//   {
//     name: 'test1';
//     component: (props: {
//       name: string;
//       register: UseFormRegister<any>;
//       age: number;
//     }) => JSX.Element;
//   },
//   {
//     name: 'test2';
//     component: (props: {
//       name: string;
//       register: UseFormRegister<any>;
//     }) => JSX.Element;
//   },
//   {
//     name: 'test3';
//     component: (props: {
//       name: string;
//       // register: UseFormRegister<any>;
//     }) => JSX.Element;
//   },
//   {
//     name: 'test4';
//     component: (props: {
//       name: string;
//       register: UseFormRegister<any>;
//     }) => JSX.Element;
//   }
// ];

// type Test = FindErrorFieldIndexes<A>;
