import { deserializeFunction, isFunction, methodType } from '../utils';

self.addEventListener('message', async (event) => {
  if(!event.isTrusted) return;
  let { data } = event;
  let { url, body, options } = data;
  let method = methodType(options);
  if((method === 'POST' || method === 'PUT') && body) {
    let requestMiddleware = data?.requestMiddleware && deserializeFunction(data.requestMiddleware);
    options = { ...options, body: isFunction(requestMiddleware) ? JSON.stringify(requestMiddleware(body)) : JSON.stringify(body) };
  }
  try {
    let response = await fetch(url, options);
    if(response.ok && response.status !== 400 && response.status !== 403) {
      let responseData = await response.json();
      let responseMiddleware = data?.responseMiddleware && deserializeFunction(data.responseMiddleware);
      let responseMiddlewareData = isFunction(responseMiddleware) ? responseMiddleware(responseData) : responseData;
      self.postMessage({ type: 'data', data: responseMiddlewareData });
    } else {
      self.postMessage({ type: 'error', data: `Error: ${response.statusText}` });
    }
  } catch (error) {
    self.postMessage({ type: 'error', data: (error as Error)?.message ?? error });
  }
});
