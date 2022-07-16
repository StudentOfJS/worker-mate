import { createWorkerPromise } from './createWorkerPromise';
import DoWork from './worker/worker.ts?worker&inline';

export function doHardwork<T>(fn: Function, rawData: any) {
  return createWorkerPromise<T>(DoWork, {fn, rawData})
}
