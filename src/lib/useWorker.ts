import { serializeFunction } from './utils';
import { workerFactory } from './workerFactory';

export interface WorkerResponseType {
  data: {
    type: 'error' | 'data';
    data: unknown | Error;
  };
}

export async function useWorker(fn: Function, rawData: any) {
  return new Promise((resolve, reject) => {
    let worker = workerFactory.next().value;
    worker?.addEventListener(
      'message',
      ({ data: { type, data } }: WorkerResponseType) => {
        if (type === 'data') {
          resolve(data);
          worker?.terminate();
        }
        if (type === 'error') {
          reject(data);
          worker?.terminate();
        }
      }
    );
    worker?.postMessage({ fn: serializeFunction(fn), rawData });
  });
}
