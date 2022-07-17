import { deserializeFunction, isFunction } from '../utils';

self.addEventListener('message', async (event) => {
  if(!event.isTrusted) return;
  let { data } = event;
  let fn = data?.fn && deserializeFunction(data.fn);
  if (!isFunction(fn)) {
    self.postMessage({
      type: 'error',
      error: 'no function provided',
    });
  } else if (!data?.rawData) {
    self.postMessage({ type: 'error', error: 'no data provided' });
  } else {
    self.postMessage({ type: 'data', data: fn(data.rawData) });
  }
});
