import { serializeFunction } from '.';
import { createWorkerPromise } from './createWorkerPromise';
import FetchWorker from '../worker/fetch_worker.ts?worker&inline';

export interface FetchToolProps {
    url: string;
    body?: any;
    options?: RequestInit;
    requestMiddleware?: Function;
    responseMiddleware?: Function;
}

export function fetchTool<T>({ url, body, requestMiddleware, responseMiddleware, options }: FetchToolProps) {
    return createWorkerPromise<T>(FetchWorker, {
        url,
        body,
        options,
        requestMiddleware: requestMiddleware && serializeFunction(requestMiddleware), 
        responseMiddleware: responseMiddleware && serializeFunction(responseMiddleware)
    })
}
