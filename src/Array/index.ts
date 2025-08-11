export const flatMap = <
  T extends Record<string, any>,
  K extends Extract<keyof T, string>
>(
  resource: T[],
  key: K
): Array<Omit<T, K>> => {
  return resource.reduce<Array<Omit<T, K>>>((res, item) => {
    const { [key]: nested, ...rest } = item;
    res.push(rest as Omit<T, K>);
    if (nested && Array.isArray(nested) && nested.length) {
      const r = flatMap(item[key] as unknown as T[], key);
      res.push(...(r as Array<Omit<T, K>>));
    }
    return res;
  }, []);
};
