import type { ComponentProps } from "react";

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

type FormField = {
  name: any;
  component: (props: any) => JSX.Element;
};

type MandatoryFieldProps = {
  value: {};
  onChange: (value: any) => void;
  error?: {
    message: string;
  };
};

type AnyOfThisExtendsUndefined<TThis> = undefined extends TThis ? true : false;
type GetObjectFieldValue<
  TObj,
  TKey extends keyof TObj
> = TKey extends keyof TObj ? TObj[TKey] : undefined;

type AnyOfThisExtendsThat<TThis, TThat> = Extract<TThis, TThat> extends never
  ? AnyOfThisExtendsUndefined<TThat> extends true
    ? AnyOfThisExtendsUndefined<TThis>
    : false
  : undefined extends TThis
  ? Extract<Exclude<TThis, undefined>, Exclude<TThat, undefined>> extends never
    ? TThis extends undefined
      ? true
      : false
    : true
  : true;

type AnyOfThisObjExtendsThatObj<TThisObj, TThatObj> = {
  [K in keyof TThatObj]-?: AnyOfThisExtendsThat<
    // @ts-expect-error
    GetObjectFieldValue<TThisObj, K>,
    TThatObj[K]
  >;
}[keyof TThatObj];

export type FindErrorFieldIndexes<
  TFormFields extends any[],
  TErrorFieldIndexes extends number = never
> = AnyOfThisObjExtendsThatObj<
  TFormFields extends [...any, infer RField]
    ? RField extends FormField
      ? ComponentProps<RField["component"]>
      : never
    : never,
  MandatoryFieldProps
> extends true
  ? TFormFields extends [...infer TFormFieldsFrontRest, any]
    ? FindErrorFieldIndexes<TFormFieldsFrontRest, TErrorFieldIndexes>
    : TErrorFieldIndexes
  : TFormFields extends [...infer TFormFieldsFrontRest, any]
  ? TFormFieldsFrontRest["length"] extends 0
    ? TErrorFieldIndexes | TFormFieldsFrontRest["length"]
    : FindErrorFieldIndexes<
        TFormFieldsFrontRest,
        TErrorFieldIndexes | TFormFieldsFrontRest["length"]
      >
  : never;
