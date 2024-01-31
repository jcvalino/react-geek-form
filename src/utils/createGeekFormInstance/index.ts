import { z } from 'zod';
import { type FieldPath } from 'react-hook-form';

import createForm from '../createForm';

type FieldContext = 'register' | 'control' | 'error';

// TODO
// type FormFieldComponent =
//   | ((props: { name: string; register: UseFormRegister<any> }) => JSX.Element)
//   | ((props: { name: string; control: Control<any> }) => JSX.Element);

type FormFieldComponent = (props: any) => JSX.Element;

const createGeekFormInstance = <
  TFormFieldName extends string,
  TFormFieldComponent extends FormFieldComponent,
  TWrappedFormFields extends {
    readonly name: TFormFieldName;
    readonly component: TFormFieldComponent;
  }[]
>({
  fieldComponents,
}: {
  readonly fieldComponents: TWrappedFormFields;
}) => {
  const cF = <TSchema extends z.ZodObject<any> | z.ZodEffects<any>>({
    zodSchema,
  }: {
    zodSchema: TSchema;
  }) => {
    type InferedSchema = z.infer<TSchema>;
    const { forwardFormContext, withFieldContext, useFormContext } = createForm(
      { zodSchema }
    );

    const registeredFields = fieldComponents.reduce<{
      [FormField in TWrappedFormFields[number] as FormField extends any
        ? FormField['name']
        : never]: (props: {
        [K in keyof Omit<
          React.ComponentPropsWithoutRef<FormField['component']>,
          FieldContext
        >]: K extends 'name'
          ? FieldPath<InferedSchema>
          : Omit<
              React.ComponentPropsWithoutRef<FormField['component']>,
              FieldContext
            >[K];
      }) => JSX.Element;
    }>((fields, field) => {
      // @ts-expect-error
      fields[field.name] = withFieldContext(field.component);
      return fields;
    }, {} as any);

    return {
      useFormContext,
      withFieldContext,
      forwardFormContext,
      ...registeredFields,
    };
  };

  return {
    createForm: cF,
  };
};

export default createGeekFormInstance;
