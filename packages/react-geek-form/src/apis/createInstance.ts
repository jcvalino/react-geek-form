// import { z } from "zod";
// import React, { type ForwardRefExoticComponent } from "react";
import type {
  UseFormProps,
  // FieldPath
} from "react-hook-form";

// import type {
//   MakePropertyOptional,
//   UnionToArray,
//   FindErrorFieldIndexes,
// } from "../utils";
import type {
  FieldComponentMap,
  FieldRegistrar,
  // FieldRegistrarBuilder,
  CreateFormFactory,
  RegisteredFields,
} from "../utils/builderTypes";
import createForm, { type ValidSchema } from "./createForm";

// type FormFieldComponent = (props: any) => JSX.Element;

/**
 * Internal function to build the createForm factory with registered fields
 */
function buildCreateForm<CM extends FieldComponentMap>(
  fieldComponents: CM
): CreateFormFactory<CM> {
  return function createFormFactory<TSchema extends ValidSchema>({
    zodSchema,
    mode,
  }: {
    zodSchema: TSchema;
    mode?: UseFormProps["mode"];
  }) {
    // type InferedSchema = z.infer<TSchema>;
    const form = createForm({ zodSchema, mode });

    // Build registered fields object using the extracted type
    type CurrentRegisteredFields = RegisteredFields<CM, TSchema>;

    const registeredFields = Object.keys(fieldComponents).reduce(
      (fields, fieldName) => {
        const component = fieldComponents[fieldName as keyof CM];
        const wrappedComponent = form.withFieldContext(component as any);

        // Copy static properties from original component
        Object.assign(wrappedComponent, component);

        (fields as any)[fieldName] = wrappedComponent;
        return fields;
      },
      {} as CurrentRegisteredFields
    );

    return {
      ...form,
      ...registeredFields,
    } as any;
  };
}

// Overload 1: Legacy API - pass components directly
export function createInstance<CM extends FieldComponentMap>(
  fieldComponents: CM
): FieldRegistrar<CM>;

// Overload 2: Builder API - no arguments, returns builder
// export function createInstance(): FieldRegistrarBuilder;

// Implementation
export function createInstance<CM extends FieldComponentMap>(
  fieldComponents: CM
): FieldRegistrar<CM> {
  // if (fieldComponents) {
  // Legacy API: return createForm factory directly
  return {
    createForm: buildCreateForm(fieldComponents),
  };
  // }

  // Builder API: return builder with withFields method
  // return {
  //   withFields: <NewCM extends FieldComponentMap>(components: NewCM) => ({
  //     createForm: buildCreateForm(components),
  //   }),
  // };
}

export default createInstance;
