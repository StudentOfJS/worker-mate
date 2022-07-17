import { serializeFunction } from '../utils';
import { createWorkerPromise } from '../utils/createWorkerPromise';
import FetchWorker from '../worker/fetch_worker.ts?worker&inline';

export interface FetchToolProps {
    url: string;
    options?: RequestInit;
    requestMiddleware?: Function;
    responseMiddleware?: Function;
    retry?: {
        attempts: number;
        delay: number;
    };
}

export const fetchWorker = <T>({ url, requestMiddleware, responseMiddleware, options, retry }: FetchToolProps) => {
    return createWorkerPromise<T>(FetchWorker, {
        url,
        options,
        requestMiddleware: requestMiddleware && serializeFunction(requestMiddleware), 
        responseMiddleware: responseMiddleware && serializeFunction(responseMiddleware),
        retry
    })
}
