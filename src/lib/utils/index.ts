export const serializeFunction = (f: Function) => encodeURI(f.toString());
export const deserializeFunction = (s: string) =>
  new Function(`return ${decodeURI(s)}`)();
export const isFunction = (fn: unknown) => typeof fn === 'function';
