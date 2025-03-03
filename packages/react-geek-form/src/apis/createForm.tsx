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
import type { z } from "zod";

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

export type ValidSchema = z.Schema<any, any>;

type CreateFormProps<TSchema> = {
  zodSchema: TSchema;
  mode?: UseFormProps["mode"];
};
const createForm = <TSchema extends ValidSchema>({
  zodSchema,
  mode,
}: CreateFormProps<TSchema>) => {
  type InferedSchema = z.infer<TSchema>;
  type UseFormConfigs = UseFormProps<InferedSchema>;

  type Ctx = UseFormReturn<InferedSchema> & {
    /** @deprecated This method will be removed in a future release. */
    setFormConfigs: (props: UseFormConfigs) => void;
    setZodSchema: (
      schema: ValidSchema | ((schema: TSchema) => ValidSchema)
    ) => void;
    useSetDefaultValues: (values: DefaultValues<InferedSchema>) => void;
  };

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

  function useWatch<
    TFieldName extends FieldPath<InferedSchema> = FieldPath<InferedSchema>
  >(props: {
    name: TFieldName;
    defaultValue?: FieldPathValue<InferedSchema, TFieldName>;
    disabled?: boolean;
    exact?: boolean;
  }): FieldPathValue<InferedSchema, TFieldName>;

  function useWatch<
    TFieldNames extends readonly FieldPath<InferedSchema>[] = readonly FieldPath<InferedSchema>[]
  >(props: {
    name: readonly [...TFieldNames];
    defaultValue?: DeepPartialSkipArrayKey<InferedSchema>;
    disabled?: boolean;
    exact?: boolean;
  }): FieldPathValues<InferedSchema, TFieldNames>;

  function useWatch(props: any) {
    const { control } = useFormContext();
    return _useWatch({
      ...(props ?? {}),
      control,
    });
  }

  const useFieldArray = <
    TFieldArrayName extends FieldArrayPath<InferedSchema> = FieldArrayPath<InferedSchema>,
    TKeyName extends string = "id"
  >(
    props: Omit<
      UseFieldArrayProps<InferedSchema, TFieldArrayName, TKeyName>,
      "control"
    >
  ): UseFieldArrayReturn<InferedSchema, TFieldArrayName, TKeyName> => {
    const { control } = useFormContext();
    return _useFieldArray({
      ...props,
      control,
    });
  };

  const useFormState = (
    props?: Omit<UseFormStateProps<InferedSchema>, "control">
  ): UseFormStateReturn<InferedSchema> => {
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
      props: Parameters<TWrappedComponent>[0] & {
        onInitializedFormContext?: (ctx: Ctx) => void;
      }
    ) => {
      const [isRendered, setIsRendered] = useState(false);
      const [_zodSchema, _setZodSchema] = useState<ValidSchema>(zodSchema);

      const [_formConfigs, _setFormConfigs] = useState<UseFormConfigs | null>({
        mode,
      });

      const form = useForm({
        resolver: zodResolver(_zodSchema),
        ..._formConfigs,
      }) as Ctx;

      // @ts-expect-error
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
            ? FieldPath<InferedSchema>
            : string
          : OmittedProps[K];
      } & {
        noStrict?: TNoStrict;
      }
    ) => {
      const { control } = useFormContext();

      return (
        <Controller
          // @ts-expect-error because of noStrict
          name={remainingProps.name}
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
