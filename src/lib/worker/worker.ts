import { deserializeFunction, isFunction, isPromise } from '../utils';

self.addEventListener('message', async (event) => {
  let { data } = event;
  let fn = data?.fn && deserializeFunction(data.fn);
  if (!isFunction(fn)) {
    self.postMessage({
      type: 'error',
      data: new Error('no function provided'),
    });
  } else if (!data?.rawData) {
    self.postMessage({ type: 'error', data: new Error('no data provided') });
  } else if (isPromise(data.fn)) {
    alert("promise found")
    try {
      let processedData = await fn(data.rawData);
      self.postMessage({ type: 'data', data: processedData });
    } catch {
      self.postMessage({
        type: 'error',
        data: new Error('data processing failed'),
      });
    }
  } else {
    self.postMessage({ type: 'data', data: fn(data.rawData) });
  }
});
