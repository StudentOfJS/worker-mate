import type { WorkerResponseType } from "../types";

export const createWorkerPromise = <T>(Worker: new () => Worker, postMessage: Record<string, any>): Promise<T> => {
    return new Promise((resolve, reject) => {
      let worker = new Worker();
      if (worker) {
        worker.onmessage = (e: WorkerResponseType<T>) => {
          if(e.isTrusted) {
            e.data?.type === 'error' ? reject(e.data.data) : resolve(e.data.data);
          }
          worker?.terminate();
        }
        worker.onerror = worker.onmessageerror = reject;
      }
      worker?.postMessage(postMessage);
    });
  }