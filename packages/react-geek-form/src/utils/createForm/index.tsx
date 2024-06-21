import React, { useEffect, useContext, createContext, useState } from 'react';
import { z } from 'zod';
import {
  useForm,
  useWatch as _useWatch,
  useFormState as _useFormState,
  useFieldArray as _useFieldArray,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
  FieldPath,
  UseFormProps,
  UseFormReturn,
  UseWatchProps,
  UseFormStateProps,
} from 'react-hook-form';

type ContextInjectedFieldPropKey = 'register' | 'control' | 'error';

// TODO
// type FormFieldComponent =
//   | ((props: { name: string; register: UseFormRegister<any> }) => JSX.Element)
//   | ((props: { name: string; control: Control<any> }) => JSX.Element);

type FormFieldComponent = (props: any) => JSX.Element;

const getStringyfiedNestedAttribute = <TReturn extends any = any>(
  obj: Record<string, any>,
  getterString: string
) => {
  const attributesArray = getterString.split('.');

  const getter = (inner: unknown, pathAttributes: string[]): any => {
    if (!pathAttributes.length) return inner;
    if (typeof inner !== 'object' || inner === null) return undefined;
    const nextPath = pathAttributes.shift() ?? '';
    if (!(nextPath in inner)) return undefined;
    // @ts-expect-error
    return getter(inner[nextPath], pathAttributes);
  };

  return getter(obj, attributesArray) as TReturn;
};

type WrapperLayer = <
  TCtx,
  TWrappedComponent extends (props: any, ctx: TCtx) => JSX.Element
>(props: {
  component: TWrappedComponent;
  props: any;
  ctx: TCtx;
}) => any;

const WrapperLayer: WrapperLayer = ({ component, props, ctx }) =>
  component(props, ctx);

type ValidSchema = z.ZodObject<any> | z.ZodEffects<any>;

const createForm = <TSchema extends ValidSchema>({
  zodSchema,
}: {
  zodSchema: TSchema;
}) => {
  type InferedSchema = z.infer<TSchema>;
  type UseFormConfigs = UseFormProps<InferedSchema>;

  type Ctx = UseFormReturn<InferedSchema> & {
    setFormConfigs: (props: UseFormConfigs) => void;
    setZodSchema: (
      schema: ValidSchema | ((schema: TSchema) => ValidSchema)
    ) => void;
  };

  const FormContext = createContext<null | Ctx>(null);

  const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context)
      throw new Error("Invalid use. Must be inside of a 'forwardFormContext'");
    return context;
  };

  const useWatch = (props?: Omit<UseWatchProps<InferedSchema>, 'control'>) => {
    const { control } = useFormContext();
    // @ts-expect-error
    return _useWatch({
      ...(props ?? {}),
      control,
    });
  };

  const useFieldArray = (
    props: Omit<Parameters<typeof _useFieldArray<InferedSchema>>[0], 'control'>
  ) => {
    const { control } = useFormContext();
    return _useFieldArray({
      ...props,
      control,
    });
  };

  const useFormState = (
    props?: Omit<UseFormStateProps<InferedSchema>, 'control'>
  ) => {
    const { control } = useFormContext();
    return _useFormState({
      ...(props ?? {}),
      control,
    });
  };

  const forwardFormContext = <
    TWrappedComponent extends (props: any, ctx: Ctx) => JSX.Element
  >(
    WrappedComponent: TWrappedComponent
  ) => {
    return (
      props: React.ComponentPropsWithoutRef<TWrappedComponent> & {
        onInitializedFormContext?: (ctx: Ctx) => void;
      }
    ) => {
      const [_zodSchema, _setZodSchema] = useState<ValidSchema>(zodSchema);
      const [_formConfigs, _setFormConfigs] = useState<UseFormConfigs | null>(
        null
      );

      const form = useForm({
        resolver: zodResolver(_zodSchema),
        ...(_formConfigs ?? {}),
      }) as Ctx;

      // @ts-expect-error
      form.setZodSchema = _setZodSchema;
      form.setFormConfigs = _setFormConfigs;

      useEffect(() => {
        props.onInitializedFormContext?.(form);
      }, [form, props]);

      const [isRendered, setIsRendered] = useState(false);

      useEffect(() => {
        setIsRendered(true);
      }, [setIsRendered]);

      return (
        <FormContext.Provider value={form}>
          {isRendered && (
            <WrapperLayer
              ctx={form}
              props={props}
              component={WrappedComponent}
            />
          )}
        </FormContext.Provider>
      );
    };
  };

  const withFieldContext = <TWrappedFormField extends FormFieldComponent>(
    WrappedFormField: TWrappedFormField
  ) => {
    type FormFieldUniqueProps = Omit<
      React.ComponentPropsWithoutRef<TWrappedFormField>,
      ContextInjectedFieldPropKey
    >;
    return <TNoStrict extends boolean = false>(
      remainingProps: {
        [K in keyof FormFieldUniqueProps]: K extends 'name'
          ? TNoStrict extends false
            ? FieldPath<InferedSchema>
            : string
          : FormFieldUniqueProps[K];
      } & {
        noStrict?: TNoStrict;
      }
    ) => {
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
          error={getStringyfiedNestedAttribute(errors, remainingProps.name)}
          {...remainingProps}
        />
      );
    };
  };

  return {
    useWatch,
    useFormState,
    useFieldArray,
    useFormContext,
    withFieldContext,
    forwardFormContext,
  };
};

export default createForm;
