import DoWork from './worker/worker.ts?worker&inline';

function* createWorker() {
  while (true) {
    yield new DoWork();
  }
}

export const workerFactory = createWorker();
