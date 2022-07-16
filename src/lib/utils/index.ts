export const serializeFunction = (f: Function) => encodeURI(f.toString());
export const isFunction = (fn: unknown) => typeof fn === 'function';
export const deserializeFunction = (s: string) =>
  new Function(`return ${decodeURI(s)}`)();
export const methodType = (options: RequestInit | undefined) =>
  options?.method?.toUpperCase() ?? "GET";
