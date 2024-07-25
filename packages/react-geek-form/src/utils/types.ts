import type { ErrorOption, FieldError } from 'react-hook-form';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

export type IsOneOfIndexesExtends<
  TArray extends any[],
  TValue
> = TArray extends [...infer RFrontRest, infer RLast]
  ? RLast extends TValue
    ? true
    : IsOneOfIndexesExtends<RFrontRest, TValue>
  : false;

export type MakePropertyOptional<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

type MandatoryFieldProps = {
  name?: string;
  value: any;
  onChange: (value: any) => void;
  error?: FieldError | ErrorOption;
};

type FormField = {
  name: any;
  component: (props: any) => JSX.Element;
};

export type FindErrorFieldIndexes<
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
