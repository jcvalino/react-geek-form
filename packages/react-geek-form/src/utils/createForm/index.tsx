import React, {
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
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

type WrapperLayerProps = {
  component: (props: any, ctx: any) => JSX.Element;
  props: any;
  ctx: any;
};
const WrapperLayer = ({ component, props, ctx }: WrapperLayerProps) => {
  return <>{component(props, ctx)}</>;
};

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

const createForm = <TSchema extends z.ZodObject<any> | z.ZodEffects<any>>({
  zodSchema,
}: {
  zodSchema: TSchema;
}) => {
  type InferedSchema = z.infer<TSchema>;
  type UseFormConfigs = UseFormProps<InferedSchema>;

  type Ctx = UseFormReturn<InferedSchema> & {
    setFormConfigs: (props: UseFormConfigs) => void;
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

  let useFormPropsRef: UseFormConfigs | null = null;

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
      }) as Ctx;

      form.setFormConfigs = setFormConfigs;

      useEffect(() => {
        props.onInitializedFormContext?.(form);
      }, [form, props]);

      return (
        <FormContext.Provider value={form}>
          <WrapperLayer component={component} props={props} ctx={form} />
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
    return (remainingProps: {
      [K in keyof FormFieldUniqueProps]: K extends 'name'
        ? FieldPath<InferedSchema>
        : FormFieldUniqueProps[K];
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
