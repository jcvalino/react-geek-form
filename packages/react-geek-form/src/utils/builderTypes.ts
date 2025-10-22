import z from "zod";
import type { UseFormProps, FieldPath } from "react-hook-form";
import type { ComponentProps, ForwardRefExoticComponent } from "react";

import createForm, { type ValidSchema } from "../apis/createForm";

/**
 * Map of field component names to their respective React components
 */
export type FieldComponentMap = {
  [fieldName: string]:
    | ((props: any) => JSX.Element)
    | ForwardRefExoticComponent<any>;
};

/**
 * Internal registry entry for a single field component
 */
export type RegistryEntry<CM extends FieldComponentMap, K extends keyof CM> = {
  name: K;
  component: CM[K];
};

/**
 * Type for the registered fields object that gets merged with form instance
 * Each field component gets wrapped with withFieldContext and retains static props
 */
export type RegisteredFields<
  CM extends FieldComponentMap,
  Schema extends ValidSchema
> = {
  [K in keyof CM]: {
    <
      TNoStrict extends boolean = false,
      OmittedProps = Omit<ComponentProps<CM[K]>, "value" | "error" | "name"> & {
        name: string;
      }
    >(
      props: import("./types").MakePropertyOptional<
        {
          [P in keyof OmittedProps]: P extends "name"
            ? TNoStrict extends false
              ? FieldPath<z.infer<Schema>>
              : string
            : OmittedProps[P];
        },
        "onChange" extends keyof OmittedProps ? "onChange" : never
      > & {
        noStrict?: TNoStrict;
      }
    ): JSX.Element;
  } & {
    [P in keyof CM[K]]: CM[K][P];
  };
};

/**
 * Factory function type that creates a form instance with registered fields
 */
export type CreateFormFactory<CM extends FieldComponentMap> = <
  S extends ValidSchema
>(cfg: {
  zodSchema: S;
  mode?: UseFormProps["mode"];
}) => ReturnType<typeof createForm<S>> & RegisteredFields<CM, S>;

/**
 * Object returned by createInstance - contains the createForm factory
 */
export type FieldRegistrar<CM extends FieldComponentMap> = {
  createForm: CreateFormFactory<CM>;
};

/**
 * Builder interface for chained API
 */
// export type FieldRegistrarBuilder = {
//   withFields: <CM extends FieldComponentMap>(
//     components: CM
//   ) => FieldRegistrar<CM>;
// };
