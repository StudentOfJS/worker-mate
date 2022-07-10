import { serializeFunction } from './utils';
import DoWork from './worker/worker.ts?worker&inline';

import type { WorkerResponseType } from './types';

export function doHardwork(fn: Function, rawData: any) {
  return new Promise((resolve, reject) => {
    let worker = new DoWork();
    if (worker) {
      worker.onmessage = (e: WorkerResponseType) => {
        if(e.isTrusted) {
          e.data?.type === 'error' ? reject(e.data.data) : resolve(e.data.data);
        }
        worker?.terminate();
      }
    }
    worker?.postMessage({ fn: serializeFunction(fn), rawData });
  });
}
