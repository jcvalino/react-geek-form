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

export default getStringyfiedNestedAttribute;
