import { createWorkerPromise } from '../utils/createWorkerPromise';
import DoWork from '../worker/worker.ts?worker&inline';
import { serializeFunction } from '../utils';

export const fnWorker = <T>(fn: Function, rawData: any) => {
  return createWorkerPromise<T>(DoWork, {fn: serializeFunction(fn), rawData})
}