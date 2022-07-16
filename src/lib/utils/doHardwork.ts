import { createWorkerPromise } from './createWorkerPromise';
import DoWork from '../worker/worker.ts?worker&inline';
import { serializeFunction } from '.';

export const doHardwork = <T>(fn: Function, rawData: any) => {
  return createWorkerPromise<T>(DoWork, {fn: serializeFunction(fn), rawData})
}