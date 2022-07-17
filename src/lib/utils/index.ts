export const serializeFunction = (f: Function) => encodeURI(f.toString());
export const isFunction = (fn: unknown) => typeof fn === 'function';
export const deserializeFunction = (s: string) =>
  new Function(`return ${decodeURI(s)}`)();
export const methodType = (options: RequestInit | undefined) =>
  options?.method?.toUpperCase() ?? "GET";

export function* generateRetryDelay(retry: { attempts: number; delay: number }) {
  for (let i = 0; i < retry.attempts; i++) {
    yield new Promise(resolve => i === 0 ? resolve(void 0) : setTimeout(resolve, retry.delay));
  }
}
