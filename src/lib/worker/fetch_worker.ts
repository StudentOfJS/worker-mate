import { deserializeFunction, generateRetryDelay, isFunction, methodType } from '../utils';

self.addEventListener('message', async (event) => {
  if(!event.isTrusted) return;
  let { data } = event;
  let { url, options, retry } = data;
  let method = methodType(options);
  if((method === 'POST' || method === 'PUT') && data?.requestMiddleware) {
    let requestMiddleware = deserializeFunction(data.requestMiddleware);
    let body = options.body;
    if(body && isFunction(requestMiddleware)) {
      options = { ...options, body: JSON.stringify(requestMiddleware(JSON.parse(body)))};
    }
  }
  const fetchData = async () => {
    try {
      let response = await fetch(url, options);
      if(response.ok && response.status !== 404 && response.status !== 403) {
        let responseData = await response.json();
        let responseMiddleware = data?.responseMiddleware && deserializeFunction(data.responseMiddleware);
        let responseMiddlewareData = isFunction(responseMiddleware) ? responseMiddleware(responseData) : responseData;
         return responseMiddlewareData;
      } else {
       throw new Error(`${response.status ?? response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }
  if(!retry) {retry = { attempts: 1, delay: 0 }}
  let retryDelay = generateRetryDelay(retry);
  let response;
  while(!response) {
    try {
      response = await fetchData();
      self.postMessage({ type: 'data', data: response });
    } catch (err) {
      let delay = retryDelay.next();
      if(!delay.done) {
        await delay.value;
      } else {
        response = true;
        self.postMessage({ type: 'error', error: err });
      }
    }
  }
});
