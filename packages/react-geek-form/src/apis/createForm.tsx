import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import {
  useForm,
  Controller,
  useWatch as _useWatch,
  useFormState as _useFormState,
  useFieldArray as _useFieldArray,
  type DefaultValues,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  FieldPath,
  UseFormProps,
  UseFormReturn,
  FieldPathValue,
  FieldArrayPath,
  FieldPathValues,
  UseFormStateProps,
  UseFieldArrayProps,
  UseFormStateReturn,
  UseFieldArrayReturn,
  DeepPartialSkipArrayKey,
} from "react-hook-form";

type FormFieldComponent = (props: any) => JSX.Element;

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

// export type ValidSchema = z4.ZodSchema | z3.Schema;
export type ValidSchema = any;

export type ctx<TSchema extends ValidSchema> = UseFormReturn<
  // @ts-expect-error
  z.infer<TSchema>
> & {
  /** @deprecated This method will be removed in a future release. */
  // @ts-expect-error
  setFormConfigs: (props: UseFormProps<z.infer<TSchema>>) => void;
  setZodSchema: (
    schema: ValidSchema | ((schema: TSchema) => ValidSchema)
  ) => void;
  // @ts-expect-error
  useSetDefaultValues: (values: DefaultValues<z.infer<TSchema>>) => void;
};

type CreateFormProps<TSchema> = {
  zodSchema: TSchema;
  mode?: UseFormProps["mode"];
};
const createForm = <TSchema extends ValidSchema>({
  zodSchema,
  mode,
}: CreateFormProps<TSchema>) => {
  // @ts-expect-error
  type InferedSchema = z.infer<TSchema>;
  // @ts-expect-error
  type UseFormConfigs = UseFormProps<InferedSchema>;

  type Ctx = ctx<TSchema>;

  // type Ctx = UseFormReturn<InferedSchema> & {
  //   /** @deprecated This method will be removed in a future release. */
  //   setFormConfigs: (props: UseFormConfigs) => void;
  //   setZodSchema: (
  //     schema: ValidSchema | ((schema: TSchema) => ValidSchema)
  //   ) => void;
  //   useSetDefaultValues: (values: DefaultValues<InferedSchema>) => void;
  // };

  const FormContext = createContext<null | Ctx>(null);

  const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context)
      throw new Error("Invalid use. Must be inside of a 'forwardFormContext'");
    return context;
  };

  function useWatch(props?: {
    defaultValue?: DeepPartialSkipArrayKey<InferedSchema>;
    disabled?: boolean;
    exact?: boolean;
  }): DeepPartialSkipArrayKey<InferedSchema>;

  // @ts-expect-error
  function useWatch<
    // @ts-expect-error
    TFieldName extends FieldPath<InferedSchema> = FieldPath<InferedSchema>
  >(props: {
    name: TFieldName;
    // @ts-expect-error
    defaultValue?: FieldPathValue<InferedSchema, TFieldName>;
    disabled?: boolean;
    exact?: boolean;
    // @ts-expect-error
  }): FieldPathValue<InferedSchema, TFieldName>;

  function useWatch<
    // @ts-expect-error
    TFieldNames extends readonly FieldPath<InferedSchema>[] = readonly FieldPath<InferedSchema>[]
  >(props: {
    name: readonly [...TFieldNames];
    defaultValue?: DeepPartialSkipArrayKey<InferedSchema>;
    disabled?: boolean;
    exact?: boolean;
    // @ts-expect-error
  }): FieldPathValues<InferedSchema, TFieldNames>;

  function useWatch(props: any) {
    const { control } = useFormContext();
    return _useWatch({
      ...(props ?? {}),
      control,
    });
  }

  const useFieldArray = <
    // @ts-expect-error
    TFieldArrayName extends FieldArrayPath<InferedSchema> = FieldArrayPath<InferedSchema>,
    TKeyName extends string = "id"
  >(
    props: Omit<
      // @ts-expect-error
      UseFieldArrayProps<InferedSchema, TFieldArrayName, TKeyName>,
      "control"
    >
    // @ts-expect-error
  ): UseFieldArrayReturn<InferedSchema, TFieldArrayName, TKeyName> => {
    const { control } = useFormContext();
    // @ts-expect-error
    return _useFieldArray({
      ...props,
      // @ts-expect-error
      control,
    });
  };

  const useFormState = (
    // @ts-expect-error
    props?: Omit<UseFormStateProps<InferedSchema>, "control">
    // @ts-expect-error
  ): UseFormStateReturn<InferedSchema> => {
    const { control } = useFormContext();
    // @ts-expect-error
    return _useFormState({
      ...(props ?? {}),
      // @ts-expect-error
      control,
    });
  };

  const forwardFormContext = <TWrappedComponentProps = {},>(
    WrappedComponent: (props: TWrappedComponentProps, ctx: Ctx) => JSX.Element
  ) => {
    return (
      props: TWrappedComponentProps & {
        onInitializedFormContext?: (ctx: Ctx) => void;
        defaultGeekValues?: DefaultValues<InferedSchema>;
      }
    ) => {
      const [isRendered, setIsRendered] = useState(false);
      const [_zodSchema, _setZodSchema] = useState<ValidSchema>(zodSchema);

      const [_formConfigs, _setFormConfigs] = useState<UseFormConfigs | null>({
        defaultValues: props.defaultGeekValues,
        mode,
      });

      // @ts-expect-error
      const form = useForm({
        // @ts-expect-error
        resolver: zodResolver(_zodSchema),
        ..._formConfigs,
      }) as Ctx;

      form.setZodSchema = _setZodSchema;

      form.setFormConfigs = useCallback(
        (configs: Parameters<typeof _setFormConfigs>[0]) => {
          console.warn(
            "@deprecated 'setFormConfigs' This method will be removed in a future release."
          );
          _setFormConfigs((prev) => ({ ...prev, ...configs }));
        },
        [_setFormConfigs]
      );

      form.useSetDefaultValues = (defaultValues) => {
        const defaultValuesRef = useRef(defaultValues);
        useEffect(() => {
          form.reset(defaultValuesRef.current);
        }, [form.reset]);
      };

      useEffect(() => {
        props.onInitializedFormContext?.(form);
      }, [form, props]);

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

  const isWrappedByForwardRef = (component: FormFieldComponent) =>
    typeof component === "object" && "$$typeof" in component;

  const withFieldContext = <TWrappedFormField extends FormFieldComponent>(
    WrappedFormField: TWrappedFormField
  ) => {
    type OmittedProps = Omit<
      React.ComponentPropsWithoutRef<TWrappedFormField>,
      "value" | "error" | "name"
    > & { name: string };

    return <TNoStrict extends boolean = false>(
      remainingProps: {
        [K in keyof OmittedProps]: K extends "name"
          ? TNoStrict extends false
            ? // @ts-expect-error
              FieldPath<InferedSchema>
            : string
          : OmittedProps[K];
      } & {
        noStrict?: TNoStrict;
      }
    ) => {
      const { control } = useFormContext();

      return (
        <Controller
          name={remainingProps.name}
          // @ts-expect-error
          control={control}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => (
            // @ts-expect-error
            <WrappedFormField
              // TODO: find a solution to check if a component is wrapped by forwardRef
              {...(isWrappedByForwardRef(WrappedFormField) ? { ref } : {})}
              value={value ?? ""}
              // Note: Will be implemented in the next major version
              // value={value ?? undefined}
              error={error}
              {...remainingProps}
              onChange={(...params: any[]) => {
                onChange(...params);
                if (typeof remainingProps.onChange === "function")
                  remainingProps.onChange(...params);
              }}
            />
          )}
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
