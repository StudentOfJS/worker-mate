<div align="center"><h1>Worker Mate</h1></div>

# 
[![Open Bundle](https://bundlejs.com/badge-light.svg)](https://bundlejs.com/?q=worker-mate)

###  install

    yarn add worker-mate

or

    pnpm add worker-mate

  

or

    npm install worker-mate

  

###  import

    import { doHardwork, fetchTool, createWorkerPromise } from "worker-mate"


##  doHardwork
Perform a long runnning or expensive task in a worker with a simple promise interface.

### example

    const contrivedFn = (arrayOfNumbers) => arrayOfNumbers.map(n => n ** n).filter(n => n > 9999).sort()[0]
    const contrivedArray = [420, 10, 225, 50,100,1000]
    let largestSquare = await doHardwork(contrivedFn, contrivedArray).then(n => n)

>  **Tip:** Each **doHardwork()** opens in a new web worker



### doHardwork function arguments
doHardwork requires two arguments. The first should be a pure function, that takes the second, your unprocessed data does some expensive computation and returns the result. Both arguments are required. Side effects are not recommended.
 - fn - required
 - rawData-  required

## fetchTool
Fetch with middleware in a worker. Offload expensive data transformations onto their own thread. Need to mutate the body of a request? No dramas, we've got you covered.
### example
     fetchTool<Record<string, any>>({ url: 'https://swapi.dev/api/starships/9', responseMiddleware: (d) =>  ({
          name: d?.name ?? '',
          model: d?.model ?? '',
          manufacturer: d?.manufacturer ?? '',
        })})
          .then((d: { name: string; model: string; manufacturer: string }) => { setStar(d) })
          .catch((err) => console.log(err));
      }, []);
## createWorkerPromise
This is the function we created to create fetchTool and doHardwork. If we aren't covering your use case, create your own.
### example
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
    
    export const  fetchTool = <T>({ url, body, requestMiddleware, responseMiddleware, options }: FetchToolProps) => {
        return createWorkerPromise<T>(FetchWorker, {
            url,
            body,
            options,
            requestMiddleware: requestMiddleware && serializeFunction(requestMiddleware), 
            responseMiddleware: responseMiddleware && serializeFunction(responseMiddleware)
        })
    }
    
##  Why Worker Mate?

Worker mate is just Typescript with no dependencies. It makes offloading expensive computations to web workers simple . This allows you to keep the main thread clear and your site responsive. It's a super simple, easy to use function that returns a promise. Each instantiation creates a new web worker thread, which terminates itself once the request is complete.


###  Advice
Recursion and memoization can still be used to great effect in this web worker, but you will need to pass a named function otherwise the function reference is lost.
Web workers have overhead in postMessage. This means web workers are not ideal for time critical operations like animations unless the data is kept below 10KB per request/ response. 
To keep within a 100ms response time budget it's advised to keep data below 100KB. Surma covered this in this excellent blog post  [Is postMessage slow?](https://surma.dev/things/is-postmessage-slow/index.html)
