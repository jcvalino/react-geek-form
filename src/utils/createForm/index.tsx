import React, {
  useMemo,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { FieldName, UseFormProps, UseFormReturn } from 'react-hook-form';

type FieldContext = 'register' | 'control' | 'error';

// TODO
// type FormFieldComponent =
//   | ((props: { name: string; register: UseFormRegister<any> }) => JSX.Element)
//   | ((props: { name: string; control: Control<any> }) => JSX.Element);

type FormFieldComponent = (props: any) => JSX.Element;

const createForm = <TSchema extends z.ZodObject<any> | z.ZodEffects<any>>({
  zodSchema,
}: {
  zodSchema: TSchema;
}) => {
  type Ctx = UseFormReturn<InferedSchema> & {
    setFormConfigs: (props: Omit<UseFormConfigs, 'resolver'>) => void;
  };

  const FormContext = createContext<null | Ctx>(null);

  type InferedSchema = z.infer<TSchema>;
  type UseFormConfigs = UseFormProps<InferedSchema>;

  const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context)
      throw new Error("Invalid use. Must be inside of a 'forwardFormContext'");
    return context;
  };

  let useFormPropsRef: Omit<UseFormConfigs, 'resolver'> | null = null;

  const forwardFormContext = <
    TWrappedComponent extends (props: any, ctx: Ctx) => JSX.Element
  >(
    component: TWrappedComponent
  ) => {
    return (
      props: React.ComponentPropsWithoutRef<TWrappedComponent> & {
        onInitializedFormContext?: (ctx: Ctx) => void;
      }
    ) => {
      const setFormConfigs = useCallback((props: UseFormConfigs) => {
        useFormPropsRef = props;
      }, []);

      const form = useForm({
        resolver: zodResolver(zodSchema),
        ...(useFormPropsRef ?? {}),
      });

      const ctx = useMemo(
        () => ({
          ...form,
          setFormConfigs,
        }),
        [form, setFormConfigs]
      );

      useEffect(() => {
        props.onInitializedFormContext?.(ctx);
      }, [ctx, props]);

      return (
        <FormContext.Provider value={ctx}>
          {component(props, ctx)}
        </FormContext.Provider>
      );
    };
  };

  const withFieldContext = <TWrappedFormField extends FormFieldComponent>(
    WrappedFormField: TWrappedFormField
  ) => {
    return (remainingProps: {
      [K in keyof Omit<
        React.ComponentPropsWithoutRef<TWrappedFormField>,
        FieldContext
      >]: K extends 'name'
        ? FieldName<InferedSchema>
        : Omit<
            React.ComponentPropsWithoutRef<TWrappedFormField>,
            FieldContext
          >[K];
    }) => {
      const {
        control,
        register,
        formState: { errors },
      } = useFormContext();
      return (
        // @ts-expect-error
        <WrappedFormField
          control={control}
          register={register}
          error={errors?.[remainingProps?.name]}
          {...remainingProps}
        />
      );
    };
  };

  return {
    useFormContext,
    withFieldContext,
    forwardFormContext,
  };
};

export default createForm;
